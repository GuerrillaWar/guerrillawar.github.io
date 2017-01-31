import <%= componentName %> from './<%= componentName %>.react'
<% if (clientJavascript) { %>import client from './<%=componentName%>.client.js'<% } %>

export default <%= componentName %>
<% if (clientJavascript) { %>export {client}<% } %>

