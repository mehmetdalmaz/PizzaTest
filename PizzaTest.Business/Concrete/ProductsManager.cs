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
    public class ProductsManager : IProductService
    {
        private readonly IProductDal _productsDal;
        public ProductsManager(IProductDal ProductsDal)
        {
            _productsDal = ProductsDal;
        }
        public void TDelete(Products t)
        {
            _productsDal.Delete(t);
        }

        public Products TGetById(int id)
        {
            return _productsDal.GetById(id);
        }

        public List<Products> TGetList()
        {
            return _productsDal.GetList();
        }

        public void TInsert(Products t)
        {
            _productsDal.Insert(t);
        }

        public void TUpdate(Products t)
        {
            _productsDal.Update(t);
        }
    }
}
