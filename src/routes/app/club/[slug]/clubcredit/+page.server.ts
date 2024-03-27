import { db } from "server-service/db"
import { error } from "@sveltejs/kit";

export async function load({params, parent}) {
  const { slug } = params
  
  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canBuyCC)) {
    error(403, `Forbidden to access`);
  }
  
  try {
    const clubCC = await db.transactionCC.findMany({
      where: {
        clubData: {
          id: userMemberData.clubData.id
        }
      }, orderBy: {
        createdAt: 'desc'
      }, include: {
        typeRef: true
      }
    })
    
    return {
      clubCC
    }
  } catch (e) {
    error(404, 'club not found');
  }
}