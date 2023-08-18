import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [AntDesignVueResolver({
        importStyle: false
      })],
    }),

  ],
  define:{
    "process.env":{}
  },
  resolve: {
    alias:{
      "@" : path.resolve(__dirname,"./src"),
      "@components" : path.resolve(__dirname,"./src/components"),
      "@functions" : path.resolve(__dirname,"./src/functions"),
    }
  }
})

