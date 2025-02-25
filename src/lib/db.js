// Database implementation using IndexedDB
const DB_NAME = 'calculatorApp';
const DB_VERSION = 1;

class Database {
  constructor() {
    this.db = null;
    this.ready = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'id' });
          usersStore.createIndex('email', 'email', { unique: true });
          usersStore.createIndex('username', 'username', { unique: true });
          
          // Create default admin user
          usersStore.add({
            id: 'admin-1',
            username: 'DinoRaw',
            name: 'Admin DinoRaw',
            email: 'contato@dinoraw.com.br',
            password: 'dino24413', // In production, this should be hashed
            role: 'admin',
            created_at: new Date().toISOString()
          });
        }

        // Create news store
        if (!db.objectStoreNames.contains('news')) {
          const newsStore = db.createObjectStore('news', { keyPath: 'id', autoIncrement: true });
          newsStore.createIndex('created_at', 'created_at');
        }

        // Create calculations store
        if (!db.objectStoreNames.contains('calculations')) {
          const calculationsStore = db.createObjectStore('calculations', { keyPath: 'id', autoIncrement: true });
          calculationsStore.createIndex('user_id', 'user_id');
          calculationsStore.createIndex('type', 'type');
          calculationsStore.createIndex('created_at', 'created_at');
        }
      };
    });
  }

  async transaction(storeName, mode = 'readonly') {
    await this.ready;
    const tx = this.db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    return { tx, store };
  }

  // Users methods
  async getUsers() {
    const { store } = await this.transaction('users');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserByEmail(email) {
    const { store } = await this.transaction('users');
    return new Promise((resolve, reject) => {
      const request = store.index('email').get(email);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async createUser(userData) {
    const { store } = await this.transaction('users', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add({
        ...userData,
        id: `user-${Date.now()}`,
        created_at: new Date().toISOString()
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateUser(id, userData) {
    const { store } = await this.transaction('users', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        const user = request.result;
        if (!user) {
          reject(new Error('User not found'));
          return;
        }
        const updatedUser = {
          ...user,
          ...userData,
          updated_at: new Date().toISOString()
        };
        store.put(updatedUser);
        resolve(updatedUser);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteUser(id) {
    const { store } = await this.transaction('users', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // News methods
  async getNews() {
    const { store } = await this.transaction('news');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async createNews(newsData) {
    const { store } = await this.transaction('news', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add({
        ...newsData,
        created_at: new Date().toISOString()
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateNews(id, newsData) {
    const { store } = await this.transaction('news', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        const news = request.result;
        if (!news) {
          reject(new Error('News not found'));
          return;
        }
        const updatedNews = {
          ...news,
          ...newsData,
          updated_at: new Date().toISOString()
        };
        store.put(updatedNews);
        resolve(updatedNews);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteNews(id) {
    const { store } = await this.transaction('news', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Calculations methods
  async getCalculations() {
    const { store } = await this.transaction('calculations');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getCalculationsByUser(userId) {
    const { store } = await this.transaction('calculations');
    return new Promise((resolve, reject) => {
      const request = store.index('user_id').getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async createCalculation(calcData) {
    const { store } = await this.transaction('calculations', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add({
        ...calcData,
        created_at: new Date().toISOString()
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteCalculation(id) {
    const { store } = await this.transaction('calculations', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

const db = new Database();
export default db;