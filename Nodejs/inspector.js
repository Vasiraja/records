console.log("------ Inspector Example ------");

const inspector = require('inspector');
const session = new inspector.Session();

session.connect();

session.post('Profiler.enable', () => {
  session.post('Profiler.start', () => {

    // Heavy task
    for (let i = 0; i < 1e8; i++) {}

    session.post('Profiler.stop', (err, { profile }) => {
      console.log("CPU Profile collected");
      session.disconnect();
    });
  });
});
 