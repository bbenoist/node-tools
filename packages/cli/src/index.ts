import {main} from './main';

if (require.main) {
  try {
    main();
  } catch (error) {
    console.error(error.stack);
    console.error(`Details:\n${JSON.stringify(error, undefined, '  ')}`);
    process.exit(-1);
  }
}
