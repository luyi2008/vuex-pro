import { Module } from '../../../src';
import { Dictionary } from 'src/utils';

export type ShopState = {
  products: {
    id: number;
    name: string;
    money: number;
  }[];
};

let id = 0;

type q<T> = {
  a: T;
};

type t = q<ShopState> extends q<Dictionary> ? any : string;

const Index: Module<ShopState> = {
  namespaced: true,
  state: {
    products: [
      {
        id: -1,
        name: '123',
        money: 54
      }
    ]
  },
  getters: {
    count(state) {
      return state.products.length;
    }
  },
  mutations: {
    _addProducts(state) {
      state.products.push({
        id: id++,
        name: `商品${id}`,
        money: Math.random() * 500
      });
    }
  },
  actions: {
    async delayAddProducts({ commit }) {
      await new Promise((resolve) => {
        let timer = setTimeout(() => {
          resolve();
          clearTimeout(timer);
        }, 1000);
      });
      commit('_addProducts', 'inner mutation');
    }
  }
};

export default Index;
