/// <reference types="@types/jquery" />

interface JQuery {
  /**
	 * Converts JQuery Object to array of JQuery elements
	 * @returns {JQuery[]} Array of JQuery Elements
   */
  $arr: () => JQuery[];
  
	/**
	 * Array map implementation with every element in the array representing a JQuery element
	 * @param {(value: JQuery, index: number, array: readonly JQuery[]) => U} callbackfn 
	 * @returns {U[]} Collection of map return values 
	 */
  $map: <U>(callbackfn: (value: JQuery, index: number, array: readonly JQuery[]) => U) => U[];
}