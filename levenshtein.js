function levenshteinDistance(source, target)
{
  var result = []; // This is going to be a matrix. The result we're looking for can be found by seed-filling it once all calculations are done.
  var i, j;

  // Let's fill the first line of the matrix with distances from each substring to the empty string.
  for (i = 0; i <= source.length; i++) {
    result.push([i]);
  }

  // Same as above, but for a columne. Also, the first element of the first column is already filled with a zero, hence j = 1.
  for (j = 1; j <= target.length; j++) { 
    result[0].push(j);
  }


  for (i = 1; i <= source.length; i++) {
    for (j = 1; j <= target.length; j++) {

      result[i].push(0);
      if (source[i-1] == target[j-1]) {
        result[i][j] = result[i-1][j-1];
      } else {
        var minimum = Math.min(
                               result[i-1][j] + 1,
                               result[i][j-1] + 1
                              );

        minimum = Math.min(
                           minimum,
                           result[i-1][j-1] + 1
                          );
        result[i][j] = minimum;
      }
    }
  }

  return result[source.length][target.length];
}