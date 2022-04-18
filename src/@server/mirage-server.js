/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import { createServer, Model } from 'miragejs';

export default function makeServer({ environment = 'test' } = {}) {
   const server = createServer({
      environment,

      models: {
         user: Model,
         notes: Model,
         categories: Model,
      },

      seeds(server) {
         server.create('user', {
            id: 1,
            name: 'Administrator',
            login: 'admin@admin.com',
            password: '123123',
            shortcuts: [],
            data: {
               displayName: 'Administrator',
               photoURL: 'assets/images/avatars/Velazquez.jpg',
               email: 'admin@admin.com',
            },
            role: ['admin'],
         });

         server.create('note', {
            id: 1,
            detail: 'Programa Starter FullStack',
            description: 'Programa para se tornar um desenvolvedor fullstack.',
            access_token: 'kjhasdkasdhiuhkajsb987gxs7',
         });

         server.create('category', {
            id: 1,
            title: 'Teste',
            access_token: 'kjhasdkasdhiuhkajsb987gxs7',
         });
      },

      routes() {
         this.urlPrefix = 'http://localhost:3000';
         // this.namespace = 'api';

         this.get('/users', (schema) => {
            return schema.users.all();
         });

         this.post('/login', (schema, request) => {
            const attrs = JSON.parse(request.requestBody);
            const result = schema.users.findBy({
               login: attrs.login,
               password: attrs.password,
            });
            if (result) {
               return {
                  success: true,
                  data: {
                     user: result,
                     access_token: result.access_token,
                  },
               };
            }
            return { success: false, data: 'USER NOT FOUD' };
         });

         this.post('/auth/access-token', (schema, request) => {
            const attrs = JSON.parse(request.requestBody);
            const result = schema.users.findBy({
               access_token: attrs.access_token,
            });
            if (result) {
               return {
                  success: true,
                  data: {
                     user: result,
                     access_token: result.access_token,
                  },
               };
            }
            return { success: false, data: 'USER NOT FOUD' };
         });

         this.post('/notes', (schema, request) => {
            const attrs = JSON.parse(request.requestBody);

            const result = schema.notes.create(attrs);

            return {
               success: true,
               data: { note: result },
               message: 'Produto cadastro com sucesso.',
            };
         });

         this.get('/notes', (schema) => {
            const result = schema.notes.all();
            return { success: true, data: { notes: result.models } };
         });

         this.get('/notes/:id', (schema, request) => {
            const { id } = request.params;

            const result = schema.notes.find(id);
            if (result) {
               return { success: true, data: { note: result } };
            }
            return { success: false, data: 'PRODUCT NOT FOUD' };
         });

         this.put('/notes/:id', (schema, request) => {
            const newAttrs = JSON.parse(request.requestBody);
            const { id } = request.params;
            const note = schema.notes.find(id);

            note.update(newAttrs);
            if (note) {
               return { success: true, data: { note } };
            }
            return { success: false, data: 'NOTE NOT FOUD' };
         });

         this.post('/categories', (schema, request) => {
            const attrs = JSON.parse(request.requestBody);

            const result = schema.categories.create(attrs);

            return {
               success: true,
               data: { category: result },
               message: 'Categoria cadastrada com sucesso.',
            };
         });

         this.get('/categories', (schema) => {
            const result = schema.categories.all();
            return { success: true, data: { categories: result.models } };
         });

         this.get('/categories/:id', (schema, request) => {
            const { id } = request.params;

            const result = schema.categories.find(id);
            if (result) {
               return { success: true, data: { category: result } };
            }
            return { success: false, data: 'CATEGORY NOT FOUD' };
         });

         this.put('/categories/:id', (schema, request) => {
            const newAttrs = JSON.parse(request.requestBody);
            const { id } = request.params;
            const category = schema.categories.find(id);

            category.update(newAttrs);
            if (category) {
               return { success: true, data: { category } };
            }
            return { success: false, data: 'CATEGORY NOT FOUD' };
         });
      },
   });

   return server;
}
