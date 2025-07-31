// utils.js

/**
 * Get comparator function for sorting.
 * @param {string} order - The order of sorting ('asc' or 'desc').
 * @param {string} orderBy - The column to sort by.
 * @returns {function} - The comparator function.
 */
export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  /**
   * Comparator for sorting in descending order.
   * @param {Object} a - The first item to compare.
   * @param {Object} b - The second item to compare.
   * @param {string} orderBy - The column to sort by.
   * @returns {number} - The comparison result.
   */
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  /**
   * Stable sort function.
   * @param {Array} array - The array to sort.
   * @param {function} comparator - The comparator function.
   * @returns {Array} - The sorted array.
   */
  export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  