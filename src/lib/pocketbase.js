import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090');

// Database API
const db = {
  // Authentication
  async login(email, password) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData.record;
    } catch (error) {
      throw new Error('Invalid login credentials');
    }
  },

  async logout() {
    pb.authStore.clear();
  },

  // Users
  async getUsers() {
    return await pb.collection('users').getFullList({
      sort: '-created'
    });
  },

  async getUserByEmail(email) {
    try {
      return await pb.collection('users').getFirstListItem(`email="${email}"`);
    } catch {
      return null;
    }
  },

  async createUser(userData) {
    return await pb.collection('users').create({
      ...userData,
      emailVisibility: true,
      password: userData.password,
      passwordConfirm: userData.password
    });
  },

  async updateUser(id, userData) {
    const data = { ...userData };
    if (data.password) {
      data.passwordConfirm = data.password;
    } else {
      delete data.password;
    }
    return await pb.collection('users').update(id, data);
  },

  async deleteUser(id) {
    return await pb.collection('users').delete(id);
  },

  // News
  async getNews() {
    return await pb.collection('news').getFullList({
      sort: '-created'
    });
  },

  async createNews(newsData) {
    return await pb.collection('news').create(newsData);
  },

  async updateNews(id, newsData) {
    return await pb.collection('news').update(id, newsData);
  },

  async deleteNews(id) {
    return await pb.collection('news').delete(id);
  },

  // Calculations
  async getCalculations() {
    return await pb.collection('calculations').getFullList({
      sort: '-created',
      expand: 'user'
    });
  },

  async getCalculationsByUser(userId) {
    return await pb.collection('calculations').getFullList({
      filter: `user="${userId}"`,
      sort: '-created'
    });
  },

  async createCalculation(calcData) {
    return await pb.collection('calculations').create(calcData);
  },

  async deleteCalculation(id) {
    return await pb.collection('calculations').delete(id);
  }
};

export default db;