import type { Category, Product } from "../types/domain";

export type StorefrontCategory = Category & {
  id: string;
  parentId: string | null;
  pathSegments: string[];
  path: string;
  depth: number;
  children: StorefrontCategory[];
};

export type StorefrontProduct = Product & {
  id: string;
  categorySlug: string;
  categoryPathSegments: string[];
  categoryPath: string;
  primaryImage: string;
};

type CategoryMap = Map<string, StorefrontCategory>;

function normalizeParentId(parentId: string | null | undefined) {
  return parentId ? parentId : null;
}

export function toCategoryId(value: Pick<Category, "_id">) {
  return value._id;
}

export function buildCategoryGraph(categories: Category[]) {
  const nodes = categories.map((category) => ({
    ...category,
    id: toCategoryId(category),
    parentId: normalizeParentId(category.parentId),
    pathSegments: [],
    path: "",
    depth: 0,
    children: [],
  }));
  const byId: CategoryMap = new Map(
    nodes.map((category) => [toCategoryId(category), category]),
  );
  const bySlug = new Map(
    nodes.map((category) => [category.slug, category]),
  );

  const roots: StorefrontCategory[] = [];

  for (const category of byId.values()) {
    const parent = category.parentId
      ? byId.get(category.parentId) ?? bySlug.get(category.parentId)
      : null;

    if (parent) {
      parent.children.push(category);
    } else {
      roots.push(category);
    }
  }

  const assignPaths = (
    node: StorefrontCategory,
    parentSegments: string[] = [],
  ) => {
    node.pathSegments = [...parentSegments, node.slug];
    node.path = node.pathSegments.join("/");
    node.depth = parentSegments.length;

    node.children.sort((left, right) =>
      left.createdAt && right.createdAt
        ? left.createdAt.localeCompare(right.createdAt)
        : left.title.en.localeCompare(right.title.en),
    );

    for (const child of node.children) {
      assignPaths(child, node.pathSegments);
    }
  };

  roots.sort((left, right) =>
    left.createdAt && right.createdAt
      ? left.createdAt.localeCompare(right.createdAt)
      : left.title.en.localeCompare(right.title.en),
  );

  for (const root of roots) {
    assignPaths(root);
  }

  return { roots, byId };
}

export function flattenCategoryTree(categories: StorefrontCategory[]) {
  const all: StorefrontCategory[] = [];

  const visit = (node: StorefrontCategory) => {
    all.push(node);
    for (const child of node.children) {
      visit(child);
    }
  };

  for (const category of categories) {
    visit(category);
  }

  return all;
}

export function findCategoryByPath(
  categories: Category[],
  slugSegments: string[],
): StorefrontCategory | null {
  const { byId } = buildCategoryGraph(categories);

  for (const category of byId.values()) {
    if (
      category.pathSegments.length === slugSegments.length &&
      category.pathSegments.every((segment, index) => segment === slugSegments[index])
    ) {
      return category;
    }
  }

  return null;
}

function findCategoryBySlug(
  categories: Category[],
  categorySlug: string,
) {
  const { byId } = buildCategoryGraph(categories);
  return Array.from(byId.values()).find((category) => category.slug === categorySlug) ?? null;
}

export function getCategoryAncestors(
  categorySlug: string,
  categories: Category[],
) {
  const category = findCategoryBySlug(categories, categorySlug);

  if (!category) {
    return [];
  }

  return category.pathSegments.map((_, index) => {
    const path = category.pathSegments.slice(0, index + 1);
    return findCategoryByPath(categories, path)!;
  });
}

export function getDescendantCategorySlugs(
  categorySlug: string,
  categories: Category[],
) {
  const start = findCategoryBySlug(categories, categorySlug);

  if (!start) {
    return [];
  }

  const slugs: string[] = [];
  const stack = [start];

  while (stack.length) {
    const current = stack.pop()!;
    slugs.push(current.slug);
    stack.push(...current.children);
  }

  return slugs;
}

export function enrichProductsWithCategoryPath(
  products: Product[],
  categories: Category[],
): StorefrontProduct[] {
  const { byId } = buildCategoryGraph(categories);
  const bySlug = new Map(
    Array.from(byId.values()).map((category) => [category.slug, category]),
  );

  return products
    .map((product) => {
      const categorySlug = product.categorySlug ?? "";
      const category = bySlug.get(categorySlug);

      if (!category) {
        return null;
      }

      return {
        ...product,
        id: product._id,
        categorySlug,
        categoryPathSegments: category.pathSegments,
        categoryPath: category.path,
        primaryImage: product.images[0] ?? "",
      };
    })
    .filter((product): product is StorefrontProduct => product !== null);
}

export function getProductsForCategory(
  categorySlug: string,
  categories: Category[],
  products: Product[],
) {
  const descendantSlugs = new Set(getDescendantCategorySlugs(categorySlug, categories));
  return enrichProductsWithCategoryPath(products, categories).filter((product) =>
    descendantSlugs.has(product.categorySlug),
  );
}
