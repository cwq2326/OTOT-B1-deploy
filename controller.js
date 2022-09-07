const { query } = require("express");

let menu = [
    { item_id: 1, item: "Hamburger", price: 5, description: "Very yummy!" },
];

// messages
const WRONG_ATTRIBUTE_TYPE = "One or more attributes is of wrong type";
const MISSING_ATTRIBUTE = "Missing one or more required attributes";
const INVALID_ITEM = "No such item exists in the menu";
const SUCCESS = "Success";
const ERROR = "Error";

// helper

const isMissingParams = (item_id, item, price, description) => {
    return !item_id | !item | !price | !description;
};

const isWrongParamsType = (item_id, item, price, description) => {
    if (
        (typeof item_id !== "number") |
        (typeof item !== "string") |
        (typeof price !== "number") |
        (typeof description !== "string")
    ) {
        return true;
    }
};

// GET Method
exports.getMenu = function (req, res) {
    res.status(200).send({
        status: SUCCESS,
        message: "Successfully fetched menu",
        menu: menu,
    });
};

exports.getItemFromMenu = function (req, res) {
  const queryItemId = +req.params.item_id;
  const currItem = menu.filter((item) => item.item_id === queryItemId)[0];

  if (!currItem) {
      res.status(400).send({ status: ERROR, message: INVALID_ITEM });
      return;
  }
  res.status(200).send({
      status: SUCCESS,
      message: "Item successfully retrieved from the menu",
      item: currItem,
  });
};

// POST Method
exports.addItemToMenu = function (req, res) {
    const { item_id, item, price, description } = req.body;
    if (isMissingParams(item_id, item, price, description)) {
        res.status(400).send({ status: ERROR, message: MISSING_ATTRIBUTE });
        return;
    }

    if (isWrongParamsType(item_id, item, price, description)) {
        res.status(400).send({ status: ERROR, message: WRONG_ATTRIBUTE_TYPE });
        return;
    }

    // Check if item_id already exist
    if (menu.filter((item) => item.item_id === item_id).length !== 0) {
        res.status(400).send({
            status: ERROR,
            message: `Item id already exists in the menu`,
        });
        return;
    }

    menu.push({ item_id, item, price, description });
    res.status(200).send({
        status: SUCCESS,
        message: `Item added to the menu `,
    });
};

// PUT Method
exports.updateItemInMenu = function (req, res) {
    const { item_id, item, price, description } = req.body;
    const queryItemId = +req.params.item_id;
    const currentItem = menu.filter((item) => item.item_id === queryItemId)[0];
    const existingItem = menu.filter((item) => item.item_id === item_id)[0];

    if (!currentItem) {
        res.status(400).send({ status: ERROR, message: INVALID_ITEM });
        return;
    }

    if (isMissingParams(item_id, item, price, description)) {
        res.status(400).send({ status: ERROR, message: MISSING_ATTRIBUTE });
        return;
    }

    if (isWrongParamsType(item_id, item, price, description)) {
        res.status(400).send({ status: ERROR, message: WRONG_ATTRIBUTE_TYPE });
        return;
    }

    if (existingItem && item_id !== queryItemId) {
        res.status(400).send({
            status: ERROR,
            message: "item_id already exists in the menu",
        });
        return;
    }

    updatedMenu = menu.map((curr) =>
        curr.item_id === queryItemId
            ? { item_id, item, price, description }
            : curr
    );
    menu = updatedMenu;
    res.status(200).send({
        status: SUCCESS,
        message: `Item successfully updated in the menu `,
    });
};

// Delete Method
exports.deleteItemFromMenu = function (req, res) {
    const queryItemId = +req.params.item_id;
    const currentItem = menu.filter((item) => item.item_id === queryItemId)[0];

    if (!currentItem) {
        res.status(400).send({ status: ERROR, message: INVALID_ITEM });
        return;
    }

    updatedMenu = menu.filter((item) => item.item_id !== queryItemId);
    menu = updatedMenu;
    res.status(200).send({
        status: SUCCESS,
        message: "Item successfully removed from the menu",
    });
};

// invalid paths
exports.invalidPath = function (req, res) {
    res.status(404).send({ status: ERROR, message: "This page doesn't exist" });
};
