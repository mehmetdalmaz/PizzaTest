using PizzaTest.Business.Abstract;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.EntityFramework;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Concrete
{
    public class CartManager : ICartService
    {
        private readonly ICartDal _cartDal;
        public CartManager(ICartDal CartDal)
        {
            _cartDal = CartDal;
        }

        public void AddItem(Cart cart, Products product, int quantity)
        {
            if (product.StockQuantity < quantity)
            {
                throw new Exception($"Ürün '{product.Name}' için yeterli stok yok.");
            }

            var item = cart.CartItems.FirstOrDefault(c => c.ProductID == product.ID);

            if (item == null)
            {
                cart.CartItems.Add(new CartItems
                {
                    Product = product,
                    ProductID = product.ID,
                    Quantity = quantity
                });
            }
            else
            {
                item.Quantity += quantity;
            }

             _cartDal.Update(cart);
        }

        public void ClearCart(int cartID)
        {
            var cart =  _cartDal.GetById(cartID);
            if (cart != null)
            {
                cart.CartItems.Clear();
                 _cartDal.Update(cart);
            }
        }

        public Cart GetOrCreateCart(int userID)
        {
            var cart = _cartDal.GetCartWithItems(userID);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserID = userID,
                    CartItems = new List<CartItems>()
                };
                _cartDal.Insert(cart);
            }
            return cart;
        }

        public void RemoveItem(Cart cart, int productID, int quantity)
        {
            var item = cart.CartItems.FirstOrDefault(c => c.ProductID == productID);
            if (item == null)
            {
                throw new Exception("Sepette bu ürün bulunmuyor.");
            }
            if (quantity <= 0)
            {
                throw new Exception("Geçersiz ürün miktarı.");
            }
            if (item.Product == null)
            {
                throw new Exception("Ürün bulunamadı.");
            }

            if (quantity >= item.Quantity)
            {
                cart.CartItems.Remove(item);
                item.Product.StockQuantity += item.Quantity;
            }
            else
            {
                item.Quantity -= quantity;
            }

             _cartDal.Update(cart);
        }

        public void TDelete(Cart t)
        {
            _cartDal.Delete(t);
        }

        public Cart TGetById(int id)
        {
            return _cartDal.GetById(id);
        }

        public List<Cart> TGetList()
        {
            return _cartDal.GetList();
        }

        public void TInsert(Cart t)
        {
            _cartDal.Insert(t);
        }

        public void TUpdate(Cart t)
        {
            _cartDal.Update(t);
        }

        public void UpdateItemQuantity(Cart cart, Products product, int quantity)
        {
            var item = cart.CartItems.FirstOrDefault(i => i.ProductID == product.ID);
            if (item != null)
            {
                item.Quantity = quantity;
            }
            else
            {
                cart.CartItems.Add(new CartItems
                {
                    ProductID = product.ID,
                    Quantity = quantity
                });
            }

            _cartDal.Update(cart);
        }
    }
}
