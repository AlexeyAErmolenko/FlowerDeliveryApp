import createHttpError from 'http-errors';

import {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCartById,
} from '../services/carts.js';

// import parsePaginationParams from '../utils/parsePaginationParams.js';

// import parseSortParams from '../utils/parseSortParams.js';

// import parseFilterParams from '../utils/parseFilterParams.js';

import getEnvVar from '../utils/getEnvVar.js';

const cartNotFound = () => createHttpError(404, 'Cart not found');

export const getCartsController = async (req, res) => {
  // const { page, perPage } = parsePaginationParams(req.query);

  // const { sortBy, sortOrder } = parseSortParams(req.query);

  // const filter = parseFilterParams(req.query);

  const carts = await getAllCarts({
    // page,
    // perPage,
    // sortBy,
    // sortOrder,
    // filter,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found carts!',
    data: carts,
  });
};

export const getCartByIdController = async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user.id;

  const cart = await getCartById(cartId, userId);
  if (!cart) {
    throw cartNotFound();
  }

  res.status(200).json({
    message: `Successfully found cart with id ${cartId}!`,
    data: cart,
  });
};

export const createCartsController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    isFavourite: req.body.isFavourite,
    cartType: req.body.cartType,
    userId: req.user.id,
  };
  const cart = await createCart(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a cart!`,
    data: cart,
  });
};

export const upsertCartController = async (req, res, next) => {
  const { cartId } = req.params;
  const userId = req.user.id;
  const filter = {
    _id: cartId,
    userId,
  };

  const result = await updateCart(
    filter,
    { ...req.body },
    {
      upsert: true,
    },
  );
  if (!result) {
    throw cartNotFound();
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a cart!`,
    data: result.cart,
  });
};

export const patchCartController = async (req, res, next) => {
  const { cartId } = req.params;
  const userId = req.user.id;
  const filter = {
    _id: cartId,
    userId,
  };

  const result = await updateCart(filter, {
    ...req.body,
  });

  res.json({
    status: 200,
    message: `Successfully patched a cart!`,
    data: result.cart,
  });
};

export const deleteCartByIdController = async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user.id;
  const cart = await deleteCartById(cartId, userId);
  if (!cart) {
    throw cartNotFound();
  }

  res.status(204).send();
};
