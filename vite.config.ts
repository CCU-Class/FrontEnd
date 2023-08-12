import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'

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
})

