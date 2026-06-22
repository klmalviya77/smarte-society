var typeScriptVersion = '4.0.3';

window.APP_CONFIG = {
    guardAppUrl:    "https://gaurd-console-gateguard.netlify.app/",   
    residentAppUrl: "https://resident-dashboard.netlify.app/"
};

System.config({
  transpiler: 'ts',
  typescriptOptions: {},
  packages: {
    ".": {
      main: './main.ts',
      defaultExtension: 'ts'
    }
  },
  meta: {
    'typescript': { 'exports': 'ts' }
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'ts':         'npm:plugin-typescript@8.0.0/lib/plugin.js',
    'typescript': 'npm:typescript@' + typeScriptVersion + '/lib/typescript.js'
  }
});

System.import('./main')
  .catch(function(err) {
    var ev = new CustomEvent('app-load-error', { detail: err });
    window.dispatchEvent(ev);
  });
