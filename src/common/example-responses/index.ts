const product1 = {
  id: '6fb67419-1d72-4a3d-86b0-424b5a2c9ee1',
  name: 'Bamboo Toothbrush',
  description:
    'This toothbrush is crafted from 100% biodegradable bamboo, providing an eco-friendly alternative to traditional plastic toothbrushes.',
  price: 20500,
  createdAt: '2024-12-19T04:32:40.420Z',
  updatedAt: '2025-01-03T03:32:56.613Z',
};

const product2 = {
  id: '902f7875-3966-46af-a39f-972f4edcf28e',
  name: 'Smart Water Bottle',
  description:
    'Stay hydrated throughout the day with this smart water bottle that tracks your water intake and sends gentle reminders to drink more water. The sleek design includes a built-in LED indicator and a rechargeable battery.',
  price: 350000,
  createdAt: '2024-12-19T04:32:25.840Z',
  updatedAt: '2025-01-03T03:34:06.525Z',
};

export const SUCCESS_PLACE_ORDER = {
  message: 'Order has been placed successfully!',
  order: {
    totalAmount: 2000000,
    user: {
      id: 'ef181e4b-cedd-470b-b8d8-f0b3ad99969e',
    },
    refundReason: null,
    refundAmount: null,
    refundProcessedAt: null,
    id: '2cf81410-717b-4ece-8905-8eb7c77b7300',
    status: 'PENDING',
    createdAt: '2025-01-03T02:08:16.453Z',
  },
};

export const SUCCESS_GET_ALL_ORDERS = {
  orders: [
    {
      id: 'b50ba90a-7b3d-44f3-930c-0eab2810aaed',
      totalAmount: '391000.00',
      status: 'COMPLETED',
      refundReason: null,
      refundAmount: null,
      refundProcessedAt: null,
      createdAt: '2024-12-20T05:49:22.278Z',
      items: [
        {
          id: '3a970761-f5c5-44fe-b8e1-5d32845dcdca',
          quantity: 1,
          totalPrice: '350000.00',
          product: {
            product2,
          },
        },
        {
          id: 'ce86131b-4a40-4a2c-840a-8a2ca9e119c2',
          quantity: 2,
          totalPrice: '41000.00',
          product: {
            product1
          },
        },
      ],
    },
    {
      id: '2cf81410-717b-4ece-8905-8eb7c77b7300',
      totalAmount: '700000.00',
      status: 'PENDING',
      refundReason: null,
      refundAmount: null,
      refundProcessedAt: null,
      createdAt: '2025-01-03T02:08:16.453Z',
      items: [
        {
          id: 'bc985171-b15e-4eb2-83cc-8749699939b4',
          quantity: 2,
          totalPrice: '700000.00',
          product: {
            product2
          },
        },
      ],
    },
  ],
};

export const SUCCESS_GET_ORDER = {
  order: {
    id: '2cf81410-717b-4ece-8905-8eb7c77b7300',
      totalAmount: '700000.00',
      status: 'PENDING',
      refundReason: null,
      refundAmount: null,
      refundProcessedAt: null,
      createdAt: '2025-01-03T02:08:16.453Z',
      items: [
        {
          id: 'bc985171-b15e-4eb2-83cc-8749699939b4',
          quantity: 2,
          totalPrice: '700000.00',
          product: {
            product2
          },
        },
      ],
  },
};

export const SUCCESS_UPDATE_ORDER_STATUS = {
  message:
    'Order 2cf81410-717b-4ece-8905-8eb7c77b7300 has been updated to COMPLETED',
  order: {
    id: '2cf81410-717b-4ece-8905-8eb7c77b7300',
    totalAmount: '2000000.00',
    status: 'COMPLETED',
    refundReason: null,
    refundAmount: null,
    refundProcessedAt: null,
    createdAt: '2025-01-03T02:08:16.453Z',
    items: [
      {
        id: 'bc985171-b15e-4eb2-83cc-8749699939b4',
        quantity: 2,
        totalPrice: '2000000.00',
        product: {
          id: '902f7875-3966-46af-a39f-972f4edcf28e',
          name: 'Sepeda',
          description: 'Sepeda bisa terbang',
          price: 1000000,
          createdAt: '2024-12-19T04:32:25.840Z',
          updatedAt: '2024-12-19T04:32:25.840Z',
        },
      },
    ],
    user: {
      id: 'ef181e4b-cedd-470b-b8d8-f0b3ad99969e',
      username: 'lobo123',
      email: 'marc@gmail.com',
      fullName: 'Marcus Smith',
      contactNumber: '+62 231 6373 6777',
      hashedPassword:
        '$2b$10$iSBprE1eVFtcPEuWyBOPReb9LmYzVGeXp5z5bucpIoc6Hqx3E1j7O',
      createdAt: '2024-12-19T07:11:24.310Z',
      updatedAt: '2025-01-02T04:43:54.838Z',
      address: 'Bali',
    },
  },
};

export const SUCCESS_REFUND = {
  message: 'Refund has applied successfully!',
  order: {
    id: '2cf81410-717b-4ece-8905-8eb7c77b7300',
    totalAmount: '2000000.00',
    status: 'REFUNDED',
    refundReason: 'The item received is damaged or not functioning properly.',
    refundAmount: 2000,
    refundProcessedAt: '2025-01-03T02:43:18.554Z',
    createdAt: '2025-01-03T02:08:16.453Z',
    items: [
      {
        id: 'bc985171-b15e-4eb2-83cc-8749699939b4',
        quantity: 2,
        totalPrice: '2000000.00',
        product: {
          id: '902f7875-3966-46af-a39f-972f4edcf28e',
          name: 'Sepeda',
          description: 'Sepeda bisa terbang',
          price: 1000000,
          createdAt: '2024-12-19T04:32:25.840Z',
          updatedAt: '2024-12-19T04:32:25.840Z',
        },
      },
    ],
    user: {
      id: 'ef181e4b-cedd-470b-b8d8-f0b3ad99969e',
      username: 'lobo123',
      email: 'marc@gmail.com',
      fullName: 'Marcus Smith',
      contactNumber: '+62 231 6373 6777',
      hashedPassword:
        '$2b$10$iSBprE1eVFtcPEuWyBOPReb9LmYzVGeXp5z5bucpIoc6Hqx3E1j7O',
      createdAt: '2024-12-19T07:11:24.310Z',
      updatedAt: '2025-01-02T04:43:54.838Z',
      address: 'Bali',
    },
  },
};

export const SUCCESS_GET_ALL_PRODUCTS = {
  products: [product1, product2],
};

export const SUCCESS_GET_PRODUCT = {
  product: product1,
};

export const SUCCESS_CREATE_PRODUCT = {
  message: 'Product has successfully added!',
  product: {
    name: 'Body Wash',
    description: 'Product description',
    price: 50000,
    id: '2dbb037f-fab6-48b5-b99f-45b3530e58ae',
    createdAt: '2025-01-03T03:55:59.419Z',
    updatedAt: '2025-01-03T03:55:59.419Z',
  },
};

export const SUCCESS_CREATE_TICKET = {
  message:
    'Your support request has been successfully submitted. Our team will get back to you shortly. Thank you for reaching out!',
  ticket: {
    subject: 'Checkout',
    message:
      'Why I cant checkout with Gopay? I would love this e-commerce for adding Gopay as one of the payment methods.',
    user: {
      id: 'ef181e4b-cedd-470b-b8d8-f0b3ad99969e',
    },
    id: 'aa223337-ef15-4569-853b-a7b996f39142',
    createdAt: '2025-01-03T04:02:31.315Z',
  },
};

export const SUCCESS_GET_FAQS = {
  faqs: [
    {
      id: 1,
      question: 'How do I track my order?',
      answer: "You can track your order in the 'My Orders' section.",
    },
  ],
};

export const SUCCESS_ADD_CART = {
  message: 'Added to cart successfully!',
  cartItem: {
    quantity: 2,
    cart: {
      id: '41853c35-a007-4cdc-82d2-7d51c789d0fc',
      items: [],
    },
    product: {
      id: '6fb67419-1d72-4a3d-86b0-424b5a2c9ee1',
    },
    id: 'dfad63f5-13b4-4b14-b62c-710446de82d4',
  },
};

export const SUCCESS_GET_CART = {
  cart: {
    id: '41853c35-a007-4cdc-82d2-7d51c789d0fc',
    items: [
      {
        id: 'dfad63f5-13b4-4b14-b62c-710446de82d4',
        quantity: 2,
        product: {
          product1
        },
      },
    ],
  },
};
