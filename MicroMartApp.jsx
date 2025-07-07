import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MicroMartApp() {
  const [products, setProducts] = useState([
    { id: 1, name: "บะหมี่กึ่งสำเร็จรูป", price: 6, stock: 50 },
    { id: 2, name: "น้ำเปล่า 500ml", price: 7, stock: 100 },
    { id: 3, name: "ไข่ไก่ เบอร์ 2 (แพ็ค 10 ฟอง)", price: 39, stock: 20 },
  ]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Micro Mart (ไมโครมาร์ท)</h1>
      <Tabs defaultValue="sell">
        <TabsList className="mb-4">
          <TabsTrigger value="sell">ขายสินค้า</TabsTrigger>
          <TabsTrigger value="stock">คลังสินค้า</TabsTrigger>
          <TabsTrigger value="report">รายงาน</TabsTrigger>
        </TabsList>

        <TabsContent value="sell">
          <Input
            placeholder="ค้นหาสินค้า..."
            className="mb-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {products
              .filter((p) => p.name.includes(search))
              .map((product) => (
                <Card key={product.id} onClick={() => addToCart(product)} className="cursor-pointer">
                  <CardContent className="p-2 text-center">
                    <p>{product.name}</p>
                    <p className="text-sm text-gray-500">฿{product.price}</p>
                  </CardContent>
                </Card>
              ))}
          </div>

          {cart.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">ตะกร้าสินค้า</h2>
              <ul className="mb-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    {item.name} × {item.qty} = ฿{item.price * item.qty}
                  </li>
                ))}
              </ul>
              <p className="font-bold">รวม: ฿{total}</p>
              <Button onClick={() => setCart([])} className="mt-2">บันทึกการขาย</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stock">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>สินค้า</TableHead>
                <TableHead>จำนวนในคลัง</TableHead>
                <TableHead>ราคา</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>฿{p.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="report">
          <p className="text-gray-500">(เวอร์ชันทดลอง: ยังไม่มีระบบบันทึกรายงานจริง)</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}