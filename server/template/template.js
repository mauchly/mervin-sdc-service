var template = function(appString, data) {
  return (
    `<div id="PhotoService">${appString}</div>
    <script>window.__initialData__ = ${JSON.stringify(data)}</script>
    <script src='bundle.hydrate.js'></script>`
  )
}
var refactor = function(result) {
  let object = {};
  object.listing_id = result[0].listing_id;
  result.forEach((each, index) => {
    object[`photo${index+1}_a`] = each.l_photo;
    object[`photo${index+1}_b`] = each.s_photo;
    object[`photo${index+1}_caption`] = each.alt_txt;
  })
  return object;
}

module.exports = {
  template,
  refactor
}