export async function fetchDashboardData() {
  try {
    const res = await fetch("http://localhost:3001/api/dashboard");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return { totalSales: 0, orders: 0, products: 0 };
  }
}
