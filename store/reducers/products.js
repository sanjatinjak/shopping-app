import PRODUCTS from '../../data/dummy-data';

const initalState = {
    allProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

export default (state = initalState, action) => {
    return state;
}