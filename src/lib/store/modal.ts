import { writable } from "svelte/store"
import type { iEditHeaderMovement } from "interface/inventory"
import type { iEditChannel } from "interface/catalogue"

export interface iModal {
  title: string
  template: 'loginForm'
  action?: string
  data?: any
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

function createModal(){
  const {set, subscribe} = writable<iModal | undefined>()
  return{
    subscribe,
    close:() => set(undefined),
    open: (data: iModal) => set(data),
    loginForm:() => set({title: 'Login/Register', template: 'loginForm', size:'md'})
    // deleteConfirmation:(action: string, name: string, id: string | number) => set({title: 'Delete Confirmation', template: 'deleteConfirmation', action: action, data: {name, id}}),
    // cancelConfirmation:(id: number) => set({title: 'Cancel Confirmation', template: 'cancelConfirmation', data: {id}}),
    // excelEditor:(type: number) => set({title: `Excel Editor`, template: 'excelEditor', data: type}),
    // editHeaderMovement:(data: iEditHeaderMovement) => set({title: 'Edit Movement Header', template: 'formHeaderMovement', data: data}),
    // confirmSale:(headerId: number, mode: 'cash' | 'online') => set({title: `Confirm ${mode} payment for ${headerId}`, template: 'formPaymentConfirmation', data:{mode, headerId}}),
    // cancelSale:(headerId: number) => set({title: `Cancel Sale ${headerId}`, template: 'formCancelSale', data:{headerId}}),
    // channelEditor:(channel: iEditChannel) => set({title: `Channel Editor`, template: 'channelEditor', data:{channel}}),
    // linkChannel:(product_id: number) => set({title:'Link to Ecommerce', template: 'linkEditor', data:{product_id}}),
    // connectionEditor:(collection) => set({title: 'Connection Setting', type: 'connectionEditor', size:'lg', data: {collection}}),
    // collectionCreate:() => set({title: 'Create New Collection', type: 'createCollection', size:'lg', data: {}}),
    // collectionFromBgg:(id) => set({title: 'Create New Collection', type: 'createCollection', size:'lg', data: {bggId: id}}),
    // collectionEdit:(collection) => set({title: 'Edit Collection', type: 'editCollection', size:'lg', data: {collection}}),
    // editProduct:(product, collection) => set({title: 'Product Editor', type: 'editProduct', size:'md', data: {product, collection}}),
    // editCustomer:(customer) => set({title: 'Customer Editor', type: 'customerEditor', size:'md', data: {customer}}),
    // editSupplier:(supplier) => set({title: 'Supplier Editor', type: 'supplierEditor', size:'md', data: {supplier}}),
    // editVenue:(venue) => set({title: 'Venue Editor', type: 'venueEditor', size:'md', data: {venue}}),
    // editForex:(forex) => set({title: 'Edit Forex', type: 'forexEditor', size:'sm', data: {...forex, edit:true}}),
    // createForex:() => set({title: 'Create Forex', type: 'forexEditor', size:'sm', data: {}}),
    // createPurchase:() => set({title: 'Create new Purchase', type: 'newPurchase', size:'md'}),
    // editPurchase:(data) => set({title: 'Edit Purchase', type: 'newPurchase', size:'md', data: {...data}}),
    // addPurchaseProduct:(idrBuyRate, headerId) => set({title: 'Add Product to Purchase', type: 'addPurchaseProduct', size:'md', data:{idrBuyRate, headerId}}),
    // addPurchaseNewCollection:(headerId, idrBuyRate = 0) => set({title: 'Add New Collection With This Purchase', type: 'createCollection', size:'lg', data: {headerId: headerId, idrBuyRate: idrBuyRate}}),
    // createHeaderMovement:(purchaseId) => set({title: 'Create Header Movement', type: 'addHeaderMovement', size:'sm', data:{header_purchase_id: purchaseId}}),
    // editHeaderMovement:(data) => set({title: 'Edit Header Movement', type: 'addHeaderMovement', size:'sm', data: data}),
    // addMovement:() => set({title: 'Add Product Movement', type: 'addMovement', size:'sm'}),
    // addCashflow:(headerPurchaseId) => set({title: 'Add Cashflow', type: 'addCashflow', size:'md', data:{headerPurchaseId: headerPurchaseId}}),
    // editCashflow:(oldData) => set({title: 'Edit Cashflow', type: 'addCashflow', size:'md', data:{...oldData, headerPurchaseId:0}}),
    // createHeaderSale:() => set({title: 'Create Sale', type: 'formHeaderSale', size:'sm'}),
    // updateHeaderSale:(id) => set({title: 'Update Sale', type: 'formHeaderSale', size:'sm', data: id}),
    // addSaleModifier:(headerId, grandTotal, itemTotal) => set({title: 'Sale Modifier', type: 'formSaleModifier', size:'sm', data:{headerId, grandTotal, itemTotal}}),
    // addSaleModifierType:() => set({title: 'Add Sale Modifier Type', type: 'formSaleModType', size:'sm'}),
    // updateSaleModifierType:(modTypeObj) => set({title: 'Update Sale Modifier Type', type: 'formSaleModType', size:'sm', data:modTypeObj}),
    // createPriceGroup:() => set({title: `Add Price Group`, type: 'priceGroupEditor', size:'lg'}),
    // editPriceGroup:(priceId) => set({title: `Update Price Group`, type: 'priceGroupEditor', size:'lg', data: priceId}),
  }
}

const globalModal = createModal()
export default globalModal;