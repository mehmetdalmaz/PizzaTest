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
    public class AddressManager : IAddressService
    {
        private readonly IAddressDal _addressDal;
        public AddressManager(IAddressDal addressDal)
        {
            _addressDal = addressDal;
        }
        public void TDelete(Address t)
        {
            _addressDal.Delete(t);
        }

        public Address TGetById(int id)
        {
            return _addressDal.GetById(id);
        }

        public List<Address> TGetList()
        {
            return _addressDal.GetList();
        }

        public List<Address> TGetListByUserId(int userId)
        {
            return _addressDal.GetListByUserId(userId);
        }

        public void TInsert(Address t)
        {
            _addressDal.Insert(t);
        }

        public void TUpdate(Address t)
        {
            _addressDal.Update(t);
        }
    }
}
