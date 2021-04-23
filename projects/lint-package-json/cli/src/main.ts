import {main} from './index';

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error.stack);
    console.error(`Details:\n${JSON.stringify(error, undefined, '  ')}`);
    process.exit(1);
  });
