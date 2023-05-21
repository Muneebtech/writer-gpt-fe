import { ethers } from "ethers";
import MerkleTree from "merkletreejs";
const keccak256 = require("keccak256");

/**
 * ****************Description*******************
 * This method creates tree leaves and generates a Merkle tree form the supplied
 * array of values and their types.
 *
 * @author Mohamed Alabasiri
 *
 * ***************Arguments*******************
 * @param {any[]} values array of values to be encryptied into the tree leaves
 * @param {any[]} otherValues array of other value to be concatenated and encryptied into the tree leaves
 * @param {string[]} types types of the left and right handside of the leaf values
 * @param {boolean} logging boolean variable for logging to the console, false by default
 *
 * ***************Return*******************
 * @returns { string, MerkleTree} MerkleTree root in byte32 sting, and the created Merkletree
 */
export function generateMerkleTree(
  values: any[],
  otherValues: any[],
  types: string[],
  logging = false
) {
  // Create Leaves
  const treeLeaves = createTreeLeaves(values, otherValues, types, logging);
  // Create Tree
  const { treeRoot, tree } = createTree(treeLeaves, logging);
  return { treeRoot, tree };
}

/**
 ****************Description*******************
 * This method creates and returns new keaccak256 encoded list
 * of from the 2 supplied values array.
 *
 * @author Mohamed Alabasiri
 *
 ***************Arguments*******************
 * @param {any[]} values array of values to be encryptied into the tree leaves
 * @param {any[]} otherValues array of other value to be concatenated encryptied into the tree leaves
 * @param {string[]} types types of the left and right handside of the leaf values
 * @param {boolean} logging boolean variable for logging to the console, false by default
 *
 * ***************Return*******************
 * @returns {string[]} a list of keaccal256 encoded array of leaves
 */
function createTreeLeaves(
  values: any[],
  otherValues: any[],
  types: string[],
  logging = false
): string[] {
  // Create tree leaves
  let treeLeaves: string[] = [];
  if (otherValues !== undefined) {
    values.forEach((value, index) => {
      const otherValue = otherValues[index];
      const leaf = keaccak256EncodeValuesOfTypes(
        value,
        otherValue,
        types,
        logging
      );
      treeLeaves.push(leaf);
    });
  }
  if (logging) {
    console.log("\n\n ============ Created Tree Leaves ================");
    console.log(treeLeaves);
    console.log("\n\n ============ ... ================");
  }
  return treeLeaves;
}

// Create tree for leaves
/**
 * ***************Description*******************
 * This method generates a Merkle tree form the supplied
 * array of values and their types.
 *
 * @author Mohamed Alabasiri
 *
 * ****************Arguments*******************
 * @param {string[]} treeLeaves array of keccack256 encoded strings as tree leaves
 * @param {boolean} logging boolean variable for logging to the console, false by default
 *
 * ***************Return*******************
 * @returns { string, MerkleTree} MerkleTree root in byte32 sting, and the created Merkletree
 */
function createTree(treeLeaves: string[], logging = false) {
  const tree = new MerkleTree(treeLeaves, keccak256, {
    sort: true,
  });
  const treeRoot = tree.getHexRoot();
  if (logging) {
    console.log("\n\n ============ MerkleTree ================");
    console.log("Tree Root:", treeRoot);
    console.log("\n\n ============ Created Tree ================");
    console.log("Tree:\n", tree.toString());
    console.log("\n\n ============ ... ================");
  }
  return { treeRoot, tree };
}

/**
 * ***************Description*******************
 * This method generates a Merkle tree form the supplied
 * array of values and their types.
 *
 * @author Mohamed Alabasiri
 *
 * ****************Arguments*******************
 * @param {MerkleTree} tree a list of keaccal256 encoded array of leaves
 * @param {any} value value to be encryptied into the tree leaves
 * @param {any} otherValue other value to be concatenated encryptied into the tree leaves
 * @param {string[]} types types of the left and right handside of the leaf values
 * @param {boolean} logging boolean variable for logging to the console, false by default
 *
 * *****************Return*******************
 * @returns string array of the proof of the given value for the tree
 */
export function getProofFromTree(
  tree: MerkleTree,
  value: any,
  otherValue: any,
  types: string[],
  logging = false
): string[] {
  const leaf = keaccak256EncodeValuesOfTypes(value, otherValue, types, logging);
  const proof = tree.getHexProof(leaf);

  if (logging) {
    console.log("Proof for values:", value, " ", otherValue);
    console.log("is:", proof);
  }
  return proof;
}

/**
 * ***************Description*******************
 * Checks the values supplied against the tree and verifies their
 * exsistance in the supplied tree.
 *
 * @author Mohamed Alabasiri
 *
 * ****************Arguments*******************
 * @param {MerkleTree} tree
 * @param {any} value value to be encryptied into the tree leaves
 * @param {any} otherValue other value to be concatenated encryptied into the tree leaves
 * @param {string[]} types types of the left and right handside of the leaf values
 * @param {boolean} logging boolean variable for logging to the console, false by default
 * @param proof
 * @param root
 *
 * *****************Return*******************
 * @returns boolean that if the values have belong to the tree
 */
export function verifyValuesForTree(
  tree: MerkleTree,
  value: any,
  otherValue: any,
  types: string[],
  logging = false,
  proof = getProofFromTree(tree, value, otherValue, types, logging),
  root = tree.getRoot()
): boolean {
  try {
    const leaf = keaccak256EncodeValuesOfTypes(
      value,
      otherValue,
      types,
      logging
    );
    const verificationResult = tree.verify(proof, leaf, root);
    return verificationResult;
  } catch (error) {
    if (logging) {
      console.log(error);
    }
    return false;
  }
}

/**
 ****************Description*******************
 * This method creates and returns new keaccak256 encoded list
 * of from the 2 supplied values array.
 * 
 * @author Mohamed Alabasiri
 * 
 ***************Arguments*******************
 * @param {any} value value to be encryptied into the tree leaves
 * @param {any} otherValue other value to be concatenated encryptied into the tree leaves
 * @param {string[]} types types of the left and right handside of the leaf values
 * @param {boolean} logging boolean variable for logging to the console, false by default
 
 *****************Return*******************
 * @returns string keccak256 encoded leaf from the values supplied
 */
function keaccak256EncodeValuesOfTypes(
  value: any,
  otherValue: any,
  types: string[],
  logging = false
): string {
  let packedValues = ethers.utils.solidityPack(types, [value, otherValue]);
  let leaf = ethers.utils.keccak256(packedValues);
  return leaf;
}
