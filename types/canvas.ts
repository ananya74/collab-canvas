export type Color={
    r: number;
    g: number;
    b: number;
};

export type Camera={
    x: number;
    y: number;
}

export enum LayerType{
    Rectangle,
    Ellipse,
    Text,
    Note,
    Path,
    Triangle,
    Line,
};

export type RectangleLayer={
    type:LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; // For text or note layers
};

export type EllipseLayer={
    type:LayerType.Ellipse;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; // For text or note layers
};


export type PathLayer={
    type:LayerType.Path;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    points:number[][];
    value?: string; // For text or note layers
};

export type TriangleLayer={
    type:LayerType.Triangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; 
    // For text or note layers
};

export type LineLayer={
    type:LayerType.Line;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; // For text or note layers
};

export type TextLayer={
    type:LayerType.Text;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; // For text or note layers
};

export type NoteLayer={
    type:LayerType.Note;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string; // For text or note layers
};

export type Point={
    x: number;
    y: number;
};

export type XYWH={
    x: number;
    y: number;
    width: number;
    height: number;
};

export enum Side{
    Top=1,
    Right=8,
    Bottom=2,
    Left=4,
};

export type CanvasState=
|   {
        mode:CanvasMode.None,
    }
|   {
        mode:CanvasMode.Pressing,
        origin: Point;
    }
|   {
        mode:CanvasMode.SelectionNet,
        origin: Point;
        current?: Point;
    }
|   {
        mode:CanvasMode.Translating,
        current: Point;
    }
|   {
        mode:CanvasMode.Inserting,
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note | LayerType.Path | LayerType.Triangle 
        | LayerType.Line;
    }
|   {
        mode:CanvasMode.Resizing,
        initialBounds: XYWH;
        corner: Side;
    }
|   {
        mode:CanvasMode.Pencil,

    };



export enum CanvasMode{
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
};

export type Layer = RectangleLayer|EllipseLayer|TextLayer|NoteLayer|PathLayer|TriangleLayer|LineLayer;