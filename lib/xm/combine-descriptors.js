/* eslint-disable */

// 'esm' allows node.js to require es6+ modules (import/export syntax)
// Used in descriptor files
require = require("esm")(module);
const path = require("path");
const glob = require("glob");
const fs = require("fs");

(function buildDescriptors() {
  console.log("started combining descriptor...");
  const root = path.resolve(__dirname, "../../");
  let descriptors = glob
    .sync("components/**/descriptor.js", { cwd: root })
    .map((fname) => require(path.join(root, fname)).default);

    /* remove depricated attributes */
    const updateDescriptors = []

    descriptors.map((descriptor) => {
      delete descriptor.internal
      delete descriptor.isGlobal
      updateDescriptors.push(descriptor)
    })

    descriptors = JSON.stringify(updateDescriptors)

  /* temporary arrangement to avoid CORS issue on dev01
   * and also make descriptoers to be availabel on localhost cms until a proper fix is found */
  fs.writeFile("public/_descriptors.json", descriptors, function (err) {
    if (err) throw err;
  });
  console.log("ended combining descriptor.");
})();
