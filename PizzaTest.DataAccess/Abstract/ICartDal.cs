using PizzaTest.Entity.Concrete;

namespace PizzaTest.DataAccess.Abstract
{
    public interface ICartDal : IGenericDal<Cart>
    {
        Cart? GetCartWithItems(int userID);
    }
}
