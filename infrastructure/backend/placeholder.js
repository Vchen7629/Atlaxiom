// placeholder code for lambda so terraform can init properly
exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain"
    },
    body: "Lambda initialized"
  };
};