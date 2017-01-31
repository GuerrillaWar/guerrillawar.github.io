module.exports.questions = function () {
  return [{
    "type": "input",
    "name": "componentName",
    "message": "What is the name of your component?",
  }, {
    "type": "list",
    "name": "componentFolder",
    "choices": ["atoms", "molecules", "templates", "layouts"],
    "message": "What component folder should this go in?",
  }, {
    "type": "confirm",
    "name": "clientJavascript",
    "message": "Need a client.js file?",
  }]
}

module.exports.setup = function (projectRoot, answers) {
  const target = (
    projectRoot + '/src/front-end/ui/' + answers.componentFolder + '/' +
    answers.componentName
  )

  const files = [{
    src: '_index.js',
    data: answers,
    dest: target + '/index.js',
  }, {
    src: 'Component.react.js',
    data: answers,
    dest: target + '/' + answers.componentName + '.react.js',
  }, {
    src: 'Component.data.js',
    data: answers,
    dest: target + '/' + answers.componentName + '.data.js',
  }, {
    src: 'Component.styl',
    data: answers,
    dest: target + '/' + answers.componentName + '.styl',
  }]

  if (answers.clientJavascript) {
    files.push({
      src: 'Component.client.js',
      data: answers,
      dest: target + '/' + answers.componentName + '.client.js',
    })
  }

  return files
}
