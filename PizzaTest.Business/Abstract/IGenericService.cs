using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Abstract
{
    public interface IGenericService<T> where T : class
    {
        Task TAddAsync(T t);
        Task TUpdateAsync(T t);
        Task TDeleteAsync(T t);
        Task<T> TGetByIdAsync(int id);
        Task<List<T>> TGetAllAsync();

        //void TInsert(T t);
        //void TUpdate(T t);
        //void TDelete(T t);
        //T TGetById(int id);
        //List<T> TGetList();
    }
}