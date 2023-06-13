import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import { userTransactions } from '../../hooks/userTransactions';
import { TransactionRow } from './TransactionRow';

/**
 *
 * @param {{
 *  user: User
 * }} param0
 */
export function ListTransaction({ user }) {
  const { transactions, mutate } = userTransactions();
  const [filter, setFilter] = useState({
    status: '',
    name: '',
  });

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <>
      <div>Đơn hàng của bạn</div>
      <div className="shadow-[0px_5px_5px_rgba(0,_0,_0,_0.1)] bg-[white] flex-grow rounded-[10px] overflow-hidden">
        <div className="min-h-[400px]">
          <div className="w-full  p-[15px_20px_10px_20px] flex items-center justify-end gap-4">
            <InputGroup className="!w-min">
              <InputLeftElement className="!h-[35px]">
                <svg
                  viewBox="-1 -1 26 26"
                  focusable="false"
                  stroke="#9299a6"
                  className="w-4 h-4"
                >
                  <path
                    fill="#9299a6"
                    d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                  ></path>
                </svg>
              </InputLeftElement>
              <Input
                value={filter.name}
                onInput={(e) =>
                  setFilter({ ...filter, name: e.currentTarget.value })
                }
                className="!w-[250px] !h-[35px] !bg-[white] !text-[0.9em]"
                placeholder="Tên sản phẩm"
              />
            </InputGroup>
            <div className="w-[250px]">
              <Select
                height="35px"
                className="!leading-[35px] !text-[14px]"
                pb="0"
                value={filter.status}
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
              >
                <option className="leading-[35px]" value="">
                  Trạng thái: Tất cả
                </option>
                <option className="leading-[35px]" value="PROCESSING">
                  Trạng thái: Đang chờ
                </option>
                <option className="leading-[35px]" value="REFUSE">
                  Trạng thái: Thất bại
                </option>
                <option className="leading-[35px]" value="SUCCESS">
                  Trạng thái: Thành công
                </option>
              </Select>
            </div>

            <button className="w-[30px] h-[30px] flex items-center justify-center">
              <MdRefresh size="25px" fill="#9299a6" />
            </button>
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr className="h-[50px] bg-[#f9e3aa]">
                  <th className="w-[80px]">#</th>
                  <th>Tên sản phẩm</th>
                  <th>Trạng thái</th>
                  <th>Cửa hàng</th>
                  <th>Địa chỉ</th>
                  <th>Khu vực</th>
                  <th>Update At</th>
                  <th>Create At</th>
                  <th className="w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .filter((t) => {
                    const productName =
                      '^' + (t.products?.at(0)?.name ?? '').toLowerCase();

                    if (productName && filter.status) {
                      return (
                        productName.includes('^' + filter.name.toLowerCase()) &&
                        filter.status === t.status
                      );
                    } else if (productName) {
                      return productName.includes(
                        '^' + filter.name.toLowerCase()
                      );
                    } else if (filter.status) {
                      return filter.status === t.status;
                    }
                    return true;
                  })
                  .map((item, index) => (
                    <TransactionRow
                      key={index}
                      data={item}
                      index={index}
                      refresh={mutate}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
