/*
    *
    * Wijmo Library 5.20163.254
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
import * as wjMetaBase from "wijmo/wijmo.metaFactory";
export declare class MetaFactory extends wjMetaBase.wj.interop.ControlMetaFactory {
    static CreateProp(propertyName: string, propertyType: wjMetaBase.wj.interop.PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
    static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
    static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
    static findProp(propName: string, props: PropDesc[]): PropDesc;
    static findEvent(eventName: string, events: EventDesc[]): EventDesc;
    static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
}
export declare class PropDesc extends wjMetaBase.wj.interop.PropDescBase {
}
export declare class EventDesc extends wjMetaBase.wj.interop.EventDescBase {
}
export declare class ComplexPropDesc extends wjMetaBase.wj.interop.ComplexPropDescBase {
}
