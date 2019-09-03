import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log('app started');
});

export default server;
