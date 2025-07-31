using PizzaTest.Business.Abstract;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Concrete
{
    public class CartItemManager : ICartItemService
    {
        private readonly ICartItemDal _cartItemDal;
        public CartItemManager(ICartItemDal CartItemDal)
        {
            _cartItemDal = CartItemDal;
        }
        public void TDelete(CartItems t)
        {
            _cartItemDal.Delete(t);
        }

        public CartItems TGetById(int id)
        {
            return _cartItemDal.GetById(id);
        }

        public List<CartItems> TGetList()
        {
            return _cartItemDal.GetList();
        }

        public void TInsert(CartItems t)
        {
            _cartItemDal.Insert(t);
        }

        public void TUpdate(CartItems t)
        {
            _cartItemDal.Update(t);
        }
    }
}
