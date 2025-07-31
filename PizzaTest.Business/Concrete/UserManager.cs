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
    public class UserManager : IUserService
    {
        private readonly IUserDal _userDal;
        public UserManager(IUserDal UserDal)
        {
            _userDal = UserDal;
        }
        public void TDelete(User t)
        {
            _userDal.Delete(t);
        }

        public User TGetById(int id)
        {
            return _userDal.GetById(id);
        }

        public List<User> TGetList()
        {
            return _userDal.GetList();
        }

        public void TInsert(User t)
        {
            _userDal.Insert(t);
        }

        public void TUpdate(User t)
        {
            _userDal.Update(t);
        }
    }
}
