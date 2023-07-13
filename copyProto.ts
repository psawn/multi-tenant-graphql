import * as shell from 'shelljs';

shell.mkdir('-p', 'dist/graphql/typedefs');
shell.cp('-R', 'src/graphql/typedefs/*.graphql', 'dist/graphql/typedefs');
