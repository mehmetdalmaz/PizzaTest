using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.DataAccess.Abstract
{
    public interface IGenericDal<T> where T : class
    {
        Task AddAsync(T t);
        void Update(T t);
        void Delete(T t);
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();

        //void Insert(T t);
        //void Update(T t);
        //void Delete(T t);
        //T GetById(int id);
        //List<T> GetList();
    }
}
