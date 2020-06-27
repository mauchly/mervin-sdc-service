var template = function(appString, data) {
  return (
    `<div id="PhotoService">${appString}</div>
    <script>window.__initialData__ = ${JSON.stringify(data)}</script>
    <script src='bundle.hydrate.js'></script>`
  )
}

export default template;