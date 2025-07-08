import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator.js';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin/index.js';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      esmCompatible: true,
      pathToSource: `${import.meta.dirname}/../src`,
    }),
  ],
  outputDir: `${import.meta.dirname}/../src`,
  watch: false,
  tsconfigPath: 'tsconfig.json',
});
