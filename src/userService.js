// User management service
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function findUser(username, password) {
  const users = getUsers();
  return users.find(u => u.username === username && u.password === password);
}

export function isAdmin(username, password) {
  return username === 'Admindino' && password === 'dino24413';
}

export function addUser(user) {
  const users = getUsers();
  users.push({
    ...user,
    id: Date.now(),
    role: 'user',
    createdAt: new Date().toISOString()
  });
  saveUsers(users);
  return user;
}

export function updateUser(userId, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index >= 0) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
    return users[index];
  }
  return null;
}

export function deleteUser(userId) {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveUsers(filtered);
}