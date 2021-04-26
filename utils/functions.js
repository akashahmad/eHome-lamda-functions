exports.forEach = async (array, callback) => {
    // Rewriting the forEach loop
    for (let index = 0; index < array.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array);
    }
  };