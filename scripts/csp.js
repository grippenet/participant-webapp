const args = process.argv.slice(2);

if(args.length < 1) {
  throw new Exception("Need to environment name as argument");
}

const env_aliases = {'prod':'production', 'dev': 'development'}

const env_name = env_aliases[ args[0]  ] ??  args[0];

console.log("Using csp for " + env_name);

process.env.NODE_ENV = env_name;

const fs = require('fs');
const env = require('react-scripts/config/env');

const vars = env();

const policies = {
  'default-src': 'REACT_APP_CSP_DEFAULT_SRC',
  'media-src': 'REACT_APP_CSP_MEDIA_SRC',
  'img-src': 'REACT_APP_CSP_IMG_SRC',
  'font-src': 'REACT_APP_CSP_FONT_SRC',
  'style-src': 'REACT_APP_CSP_STYLE_SRC',
  'script-src':  'REACT_APP_CSP_SCRIPT_SRC',
  'child-src': 'REACT_APP_CSP_CHILD_SRC',
  'connect-src': 'REACT_APP_CSP_CONNECT_URLS',
};

const csp = [];

Object.entries(policies).forEach(function(v) {
  const [name, env_var] = v;
  const policy = vars.raw[env_var];
  csp.push( name + ' ' +  policy  );
});

const content = csp.join(' ;');

// csp.conf will be added by the Docker image to be added in the nginx config
fs.writeFileSync('build/csp.conf', 'add_header Content-Security-Policy "' + content + '";');

// cps.js can be used to get the csp config for use in setupProxy.j
fs.writeFileSync('build/csp.js', 'module.exports.csp_header = "' + content + '";');
