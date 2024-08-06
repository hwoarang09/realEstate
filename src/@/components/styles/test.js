
rc-slider
Press "/" to search...









ActionsAccessibilitySource


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
/* eslint react/no-multi-comp: 0, no-console: 0 */
import '../assets/index.less';

import React from 'react';
import Slider from '../src';

const { Range } = Slider;

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  }

  onLowerBoundChange = e => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = e => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = value => {
    log(value);
    this.setState({
      value,
    });
  };

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  };

  render() {
    return (
      <div>
        <label>LowerBound: </label>
        <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
        <br />
        <label>UpperBound: </label>
        <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
        <br />
        <button type="button" onClick={this.handleApply}>
          Apply
        </button>
        <br />
        <br />
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
      </div>
    );
  }
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
    };
  }

  onSliderChange = value => {
    log(value);
  };

  onMinChange = e => {
    this.setState({
      min: +e.target.value || 0,
    });
  };

  onMaxChange = e => {
    this.setState({
      max: +e.target.value || 100,
    });
  };

  render() {
    return (
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br />
        <br />
        <Range
          defaultValue={[20, 50]}
          min={this.state.min}
          max={this.state.max}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

class ControlledRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }

  handleChange = value => {
    this.setState({
      value,
    });
  };

  render() {
    return <Range value={this.state.value} onChange={this.handleChange} />;
  }
}

class ControlledRangeDisableAcross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }

  handleChange = value => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <Range
        value={this.state.value}
        onChange={this.handleChange}
        allowCross={false}
        {...this.props}
      />
    );
  }
}

// https://github.com/react-component/slider/issues/226
class PureRenderRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: false,
    };
  }

  handleChange = value => {
    console.log(value);
    this.setState(({ foo }) => ({ foo: !foo }));
  };

  render() {
    return (
      <Range defaultValue={[20, 40, 60, 80]} onChange={this.handleChange} allowCross={false} />
    );
  }
}

export default () => (
  <div>
    <div style={style}>
      <p>Basic Range，`allowCross=false`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic reverse Range`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} reverse />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20, dots` </p>
      <Range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，disabled</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} disabled />
    </div>
    <div style={style}>
      <p>Controlled Range</p>
      <ControlledRange />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across</p>
      <ControlledRangeDisableAcross />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across, pushable=5</p>
      <ControlledRangeDisableAcross pushable={5} />
    </div>
    <div style={style}>
      <p>Multi Range</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
    </div>
    <div style={style}>
      <p>Multi Range with custom track and handle style</p>
      <Range
        count={3}
        defaultValue={[20, 40, 60, 80]}
        pushable
        trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
        handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }]}
        railStyle={{ backgroundColor: 'black' }}
      />
    </div>
    <div style={style}>
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
    <div style={style}>
      <p>Range with dynamic `max` `min`</p>
      <DynamicBounds />
    </div>
    <div style={style}>
      <p>Range as child component</p>
      <PureRenderRange />
    </div>
  </div>
);
