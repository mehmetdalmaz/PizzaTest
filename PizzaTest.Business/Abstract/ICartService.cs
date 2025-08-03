using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Abstract
{
    public interface ICartService : IGenericService<Cart>
    {
        Cart GetOrCreateCart(int userID);
        void AddItem(Cart cart, Products product, int quantity);
        void RemoveItem(Cart cart, int productID, int quantity);
        void ClearCart(int cartID);

        void UpdateItemQuantity(Cart cart, Products product, int quantity);
    }
}
