$.get("checkpass.php?i=" + secret + "&resourceId=" + resourceId, function( data ) {
  try {
    var result = JSON.parse(data);
    if (result.success) {
      __POST_RESULTS__({
        hash: result.hash,
        resourceId: result.resourceId,
      });
    }
  } catch (err) {
    console.log('error:', err);
  }
});