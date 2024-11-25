// базовий інтерфейс для всього контенту
interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

// інтерфейс для статей
interface Article extends BaseContent {
  title: string;
  body: string;
  author: string;
  tags?: string[];
}

// інтерфейс для товарів
interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

// generic тип для операцій з контентом
type ContentOperations<T extends BaseContent> = {
  create: (content: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
  update: (id: string, updates: Partial<T>) => T;
  delete: (id: string) => boolean;
  get: (id: string) => T | null;
};

// ролі
type Role = 'admin' | 'editor' | 'viewer';

// права доступу
type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// система контролю доступу для контенту
type AccessControl<T extends BaseContent> = {
  role: Role;
  permissions: Permission;
  contentType: string;
};

// тип для валідатора
type Validator<T> = {
  validate: (data: T) => ValidationResult;
};

type ValidationResult = {
  isValid: boolean;
  errors?: string[];
};

// валідатор для статей
const articleValidator: Validator<Article> = {
  validate: (data: Article): ValidationResult => {
    const errors: string[] = [];
    if (!data.title || data.title.length < 5) {
      errors.push('Title must be at least 5 characters.');
    }
    if (!data.body) {
      errors.push('Body is required.');
    }
    return {
      isValid: errors.length === 0,
      errors: errors.length ? errors : undefined,
    };
  },
};

// валідатор для товарів
const productValidator: Validator<Product> = {
  validate: (data: Product): ValidationResult => {
    const errors: string[] = [];
    if (!data.name) {
      errors.push('Name is required.');
    }
    if (data.price < 0) {
      errors.push('Price must be a positive number.');
    }
    return {
      isValid: errors.length === 0,
      errors: errors.length ? errors : undefined,
    };
  },
};

// тип для версіонування контенту
type Versioned<T extends BaseContent> = T & {
  version: number;
  previousVersions: T[];
};

// функція для створення нової версії
function createNewVersion<T extends BaseContent>(
  content: Versioned<T>,
  updates: Partial<T>
): Versioned<T> {
  const updatedContent: T = {
    ...content,
    ...updates,
    updatedAt: new Date(),
  };
  return {
    ...updatedContent,
    version: content.version + 1,
    previousVersions: [...content.previousVersions, content],
  };
}

// приклад використання версіонування
const initialArticle: Versioned<Article> = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: undefined,
  status: 'draft',
  title: 'Init title',
  body: 'Init body',
  author: 'Some Author',
  tags: ['initial', 'article'],
  version: 1,
  previousVersions: [],
};

const updatedArticle = createNewVersion(initialArticle, {
  title: 'Updated Title',
  body: 'Updated Body',
});

// приклад масиву статей
const articles: Article[] = [
  {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'Article One',
    body: 'This is first article wowzers',
    author: 'Oleg Randomchenko',
    tags: ['tag1', 'tag2'],
  },
];

// операції з контентом
const articleOperations: ContentOperations<Article> = {
  create: (content) => {
    const newArticle = {
      ...content,
      id: String(Date.now()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    articles.push(newArticle);
    return newArticle;
  },
  update: (id, updates) => {
    const articleIndex = articles.findIndex((a) => a.id === id);
    if (articleIndex === -1) throw new Error('Article not found');
    const updatedArticle = { ...articles[articleIndex], ...updates, updatedAt: new Date() };
    articles[articleIndex] = updatedArticle;
    return updatedArticle;
  },
  delete: (id) => {
    const articleIndex = articles.findIndex((a) => a.id === id);
    if (articleIndex === -1) return false;
    articles.splice(articleIndex, 1);
    return true;
  },
  get: (id) => articles.find((a) => a.id === id) || null,
};

// приклад створення нової статті
const newArticle = articleOperations.create({
  title: 'Definitely new article!',
  body: 'New article body.',
  author: 'Oleg Randomchenko',
  status: 'draft',
});

console.log(newArticle);
console.log(articleOperations.get('1'));
