// 인사연관코드정보
export class HrmRelationCode {        
    /**
     * 인사연관코드ID
     */
    relationId: number;    
    /**
     * 연관코드
     */
    relCode: string;
    /**
     * 연관코드
     */
    relCodeName: string;    
    /**
     * 부모 인사유형상세코드 Id
     */
    parentId: string;
    /**
     * 자식 인사유형상세코드 Id
     */
    childId: string;
  }
  