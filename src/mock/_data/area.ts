import type { MockAreaItem } from './_type'

const data: MockAreaItem[] = [
  {
    label: '北京',
    code: '110000',
    children: [
      {
        label: '北京市',
        code: '110100',
        children: [
          {
            label: '东城区',
            code: '110101'
          },
          {
            label: '西城区',
            code: '110102'
          },
          {
            label: '朝阳区',
            code: '110105'
          },
          {
            label: '丰台区',
            code: '110106'
          },
          {
            label: '石景山区',
            code: '110107'
          },
          {
            label: '海淀区',
            code: '110108'
          },
          {
            label: '门头沟区',
            code: '110109'
          },
          {
            label: '房山区',
            code: '110111'
          },
          {
            label: '通州区',
            code: '110112'
          },
          {
            label: '顺义区',
            code: '110113'
          },
          {
            label: '昌平区',
            code: '110114'
          },
          {
            label: '大兴区',
            code: '110115'
          },
          {
            label: '怀柔区',
            code: '110116'
          },
          {
            label: '平谷区',
            code: '110117'
          }
        ]
      },
      {
        label: '县',
        code: '110200',
        children: [
          {
            label: '密云县',
            code: '110228'
          },
          {
            label: '延庆县',
            code: '110229'
          }
        ]
      }
    ]
  },
  {
    label: '天津',
    code: '120000',
    children: [
      {
        label: '天津市',
        code: '120100',
        children: [
          {
            label: '和平区',
            code: '120101'
          },
          {
            label: '河东区',
            code: '120102'
          },
          {
            label: '河西区',
            code: '120103'
          },
          {
            label: '南开区',
            code: '120104'
          },
          {
            label: '河北区',
            code: '120105'
          },
          {
            label: '红桥区',
            code: '120106'
          },
          {
            label: '东丽区',
            code: '120110'
          },
          {
            label: '西青区',
            code: '120111'
          },
          {
            label: '津南区',
            code: '120112'
          },
          {
            label: '北辰区',
            code: '120113'
          },
          {
            label: '武清区',
            code: '120114'
          },
          {
            label: '宝坻区',
            code: '120115'
          },
          {
            label: '滨海新区',
            code: '120116'
          }
        ]
      },
      {
        label: '县',
        code: '120200',
        children: [
          {
            label: '宁河县',
            code: '120221'
          },
          {
            label: '静海县',
            code: '120223'
          },
          {
            label: '蓟县',
            code: '120225'
          }
        ]
      }
    ]
  },
  {
    label: '河北省',
    code: '130000',
    children: [
      {
        label: '石家庄市',
        code: '130100',
        children: [
          {
            label: '长安区',
            code: '130102'
          },
          {
            label: '桥西区',
            code: '130104'
          },
          {
            label: '新华区',
            code: '130105'
          },
          {
            label: '井陉矿区',
            code: '130107'
          },
          {
            label: '裕华区',
            code: '130108'
          },
          {
            label: '藁城区',
            code: '130109'
          },
          {
            label: '鹿泉区',
            code: '130110'
          },
          {
            label: '栾城区',
            code: '130111'
          },
          {
            label: '井陉县',
            code: '130121'
          },
          {
            label: '正定县',
            code: '130123'
          },
          {
            label: '行唐县',
            code: '130125'
          },
          {
            label: '灵寿县',
            code: '130126'
          },
          {
            label: '高邑县',
            code: '130127'
          },
          {
            label: '深泽县',
            code: '130128'
          },
          {
            label: '赞皇县',
            code: '130129'
          },
          {
            label: '无极县',
            code: '130130'
          },
          {
            label: '平山县',
            code: '130131'
          },
          {
            label: '元氏县',
            code: '130132'
          },
          {
            label: '赵县',
            code: '130133'
          },
          {
            label: '辛集市',
            code: '130181'
          },
          {
            label: '晋州市',
            code: '130183'
          },
          {
            label: '新乐市',
            code: '130184'
          }
        ]
      },
      {
        label: '唐山市',
        code: '130200',
        children: [
          {
            label: '路南区',
            code: '130202'
          },
          {
            label: '路北区',
            code: '130203'
          },
          {
            label: '古冶区',
            code: '130204'
          },
          {
            label: '开平区',
            code: '130205'
          },
          {
            label: '丰南区',
            code: '130207'
          },
          {
            label: '丰润区',
            code: '130208'
          },
          {
            label: '曹妃甸区',
            code: '130209'
          },
          {
            label: '滦县',
            code: '130223'
          },
          {
            label: '滦南县',
            code: '130224'
          },
          {
            label: '乐亭县',
            code: '130225'
          },
          {
            label: '迁西县',
            code: '130227'
          },
          {
            label: '玉田县',
            code: '130229'
          },
          {
            label: '遵化市',
            code: '130281'
          },
          {
            label: '迁安市',
            code: '130283'
          }
        ]
      },
      {
        label: '秦皇岛市',
        code: '130300',
        children: [
          {
            label: '海港区',
            code: '130302'
          },
          {
            label: '山海关区',
            code: '130303'
          },
          {
            label: '北戴河区',
            code: '130304'
          },
          {
            label: '青龙满族自治县',
            code: '130321'
          },
          {
            label: '昌黎县',
            code: '130322'
          },
          {
            label: '抚宁县',
            code: '130323'
          },
          {
            label: '卢龙县',
            code: '130324'
          }
        ]
      },
      {
        label: '邯郸市',
        code: '130400',
        children: [
          {
            label: '邯山区',
            code: '130402'
          },
          {
            label: '丛台区',
            code: '130403'
          },
          {
            label: '复兴区',
            code: '130404'
          },
          {
            label: '峰峰矿区',
            code: '130406'
          },
          {
            label: '邯郸县',
            code: '130421'
          },
          {
            label: '临漳县',
            code: '130423'
          },
          {
            label: '成安县',
            code: '130424'
          },
          {
            label: '大名县',
            code: '130425'
          },
          {
            label: '涉县',
            code: '130426'
          },
          {
            label: '磁县',
            code: '130427'
          },
          {
            label: '肥乡县',
            code: '130428'
          },
          {
            label: '永年县',
            code: '130429'
          },
          {
            label: '邱县',
            code: '130430'
          },
          {
            label: '鸡泽县',
            code: '130431'
          },
          {
            label: '广平县',
            code: '130432'
          },
          {
            label: '馆陶县',
            code: '130433'
          },
          {
            label: '魏县',
            code: '130434'
          },
          {
            label: '曲周县',
            code: '130435'
          },
          {
            label: '武安市',
            code: '130481'
          }
        ]
      },
      {
        label: '邢台市',
        code: '130500',
        children: [
          {
            label: '桥东区',
            code: '130502'
          },
          {
            label: '桥西区',
            code: '130503'
          },
          {
            label: '邢台县',
            code: '130521'
          },
          {
            label: '临城县',
            code: '130522'
          },
          {
            label: '内丘县',
            code: '130523'
          },
          {
            label: '柏乡县',
            code: '130524'
          },
          {
            label: '隆尧县',
            code: '130525'
          },
          {
            label: '任县',
            code: '130526'
          },
          {
            label: '南和县',
            code: '130527'
          },
          {
            label: '宁晋县',
            code: '130528'
          },
          {
            label: '巨鹿县',
            code: '130529'
          },
          {
            label: '新河县',
            code: '130530'
          },
          {
            label: '广宗县',
            code: '130531'
          },
          {
            label: '平乡县',
            code: '130532'
          },
          {
            label: '威县',
            code: '130533'
          },
          {
            label: '清河县',
            code: '130534'
          },
          {
            label: '临西县',
            code: '130535'
          },
          {
            label: '南宫市',
            code: '130581'
          },
          {
            label: '沙河市',
            code: '130582'
          }
        ]
      },
      {
        label: '保定市',
        code: '130600',
        children: [
          {
            label: '新市区',
            code: '130602'
          },
          {
            label: '北市区',
            code: '130603'
          },
          {
            label: '南市区',
            code: '130604'
          },
          {
            label: '满城县',
            code: '130621'
          },
          {
            label: '清苑县',
            code: '130622'
          },
          {
            label: '涞水县',
            code: '130623'
          },
          {
            label: '阜平县',
            code: '130624'
          },
          {
            label: '徐水县',
            code: '130625'
          },
          {
            label: '定兴县',
            code: '130626'
          },
          {
            label: '唐县',
            code: '130627'
          },
          {
            label: '高阳县',
            code: '130628'
          },
          {
            label: '容城县',
            code: '130629'
          },
          {
            label: '涞源县',
            code: '130630'
          },
          {
            label: '望都县',
            code: '130631'
          },
          {
            label: '安新县',
            code: '130632'
          },
          {
            label: '易县',
            code: '130633'
          },
          {
            label: '曲阳县',
            code: '130634'
          },
          {
            label: '蠡县',
            code: '130635'
          },
          {
            label: '顺平县',
            code: '130636'
          },
          {
            label: '博野县',
            code: '130637'
          },
          {
            label: '雄县',
            code: '130638'
          },
          {
            label: '涿州市',
            code: '130681'
          },
          {
            label: '定州市',
            code: '130682'
          },
          {
            label: '安国市',
            code: '130683'
          },
          {
            label: '高碑店市',
            code: '130684'
          }
        ]
      },
      {
        label: '张家口市',
        code: '130700',
        children: [
          {
            label: '桥东区',
            code: '130702'
          },
          {
            label: '桥西区',
            code: '130703'
          },
          {
            label: '宣化区',
            code: '130705'
          },
          {
            label: '下花园区',
            code: '130706'
          },
          {
            label: '宣化县',
            code: '130721'
          },
          {
            label: '张北县',
            code: '130722'
          },
          {
            label: '康保县',
            code: '130723'
          },
          {
            label: '沽源县',
            code: '130724'
          },
          {
            label: '尚义县',
            code: '130725'
          },
          {
            label: '蔚县',
            code: '130726'
          },
          {
            label: '阳原县',
            code: '130727'
          },
          {
            label: '怀安县',
            code: '130728'
          },
          {
            label: '万全县',
            code: '130729'
          },
          {
            label: '怀来县',
            code: '130730'
          },
          {
            label: '涿鹿县',
            code: '130731'
          },
          {
            label: '赤城县',
            code: '130732'
          },
          {
            label: '崇礼县',
            code: '130733'
          }
        ]
      },
      {
        label: '承德市',
        code: '130800',
        children: [
          {
            label: '双桥区',
            code: '130802'
          },
          {
            label: '双滦区',
            code: '130803'
          },
          {
            label: '鹰手营子矿区',
            code: '130804'
          },
          {
            label: '承德县',
            code: '130821'
          },
          {
            label: '兴隆县',
            code: '130822'
          },
          {
            label: '平泉县',
            code: '130823'
          },
          {
            label: '滦平县',
            code: '130824'
          },
          {
            label: '隆化县',
            code: '130825'
          },
          {
            label: '丰宁满族自治县',
            code: '130826'
          },
          {
            label: '宽城满族自治县',
            code: '130827'
          },
          {
            label: '围场满族蒙古族自治县',
            code: '130828'
          }
        ]
      },
      {
        label: '沧州市',
        code: '130900',
        children: [
          {
            label: '新华区',
            code: '130902'
          },
          {
            label: '运河区',
            code: '130903'
          },
          {
            label: '沧县',
            code: '130921'
          },
          {
            label: '青县',
            code: '130922'
          },
          {
            label: '东光县',
            code: '130923'
          },
          {
            label: '海兴县',
            code: '130924'
          },
          {
            label: '盐山县',
            code: '130925'
          },
          {
            label: '肃宁县',
            code: '130926'
          },
          {
            label: '南皮县',
            code: '130927'
          },
          {
            label: '吴桥县',
            code: '130928'
          },
          {
            label: '献县',
            code: '130929'
          },
          {
            label: '孟村回族自治县',
            code: '130930'
          },
          {
            label: '泊头市',
            code: '130981'
          },
          {
            label: '任丘市',
            code: '130982'
          },
          {
            label: '黄骅市',
            code: '130983'
          },
          {
            label: '河间市',
            code: '130984'
          }
        ]
      },
      {
        label: '廊坊市',
        code: '131000',
        children: [
          {
            label: '安次区',
            code: '131002'
          },
          {
            label: '广阳区',
            code: '131003'
          },
          {
            label: '固安县',
            code: '131022'
          },
          {
            label: '永清县',
            code: '131023'
          },
          {
            label: '香河县',
            code: '131024'
          },
          {
            label: '大城县',
            code: '131025'
          },
          {
            label: '文安县',
            code: '131026'
          },
          {
            label: '大厂回族自治县',
            code: '131028'
          },
          {
            label: '霸州市',
            code: '131081'
          },
          {
            label: '三河市',
            code: '131082'
          }
        ]
      },
      {
        label: '衡水市',
        code: '131100',
        children: [
          {
            label: '桃城区',
            code: '131102'
          },
          {
            label: '枣强县',
            code: '131121'
          },
          {
            label: '武邑县',
            code: '131122'
          },
          {
            label: '武强县',
            code: '131123'
          },
          {
            label: '饶阳县',
            code: '131124'
          },
          {
            label: '安平县',
            code: '131125'
          },
          {
            label: '故城县',
            code: '131126'
          },
          {
            label: '景县',
            code: '131127'
          },
          {
            label: '阜城县',
            code: '131128'
          },
          {
            label: '冀州市',
            code: '131181'
          },
          {
            label: '深州市',
            code: '131182'
          }
        ]
      }
    ]
  },
  {
    label: '山西省',
    code: '140000',
    children: [
      {
        label: '太原市',
        code: '140100',
        children: [
          {
            label: '小店区',
            code: '140105'
          },
          {
            label: '迎泽区',
            code: '140106'
          },
          {
            label: '杏花岭区',
            code: '140107'
          },
          {
            label: '尖草坪区',
            code: '140108'
          },
          {
            label: '万柏林区',
            code: '140109'
          },
          {
            label: '晋源区',
            code: '140110'
          },
          {
            label: '清徐县',
            code: '140121'
          },
          {
            label: '阳曲县',
            code: '140122'
          },
          {
            label: '娄烦县',
            code: '140123'
          },
          {
            label: '古交市',
            code: '140181'
          }
        ]
      },
      {
        label: '大同市',
        code: '140200',
        children: [
          {
            label: '城区',
            code: '140202'
          },
          {
            label: '矿区',
            code: '140203'
          },
          {
            label: '南郊区',
            code: '140211'
          },
          {
            label: '新荣区',
            code: '140212'
          },
          {
            label: '阳高县',
            code: '140221'
          },
          {
            label: '天镇县',
            code: '140222'
          },
          {
            label: '广灵县',
            code: '140223'
          },
          {
            label: '灵丘县',
            code: '140224'
          },
          {
            label: '浑源县',
            code: '140225'
          },
          {
            label: '左云县',
            code: '140226'
          },
          {
            label: '大同县',
            code: '140227'
          }
        ]
      },
      {
        label: '阳泉市',
        code: '140300',
        children: [
          {
            label: '城区',
            code: '140302'
          },
          {
            label: '矿区',
            code: '140303'
          },
          {
            label: '郊区',
            code: '140311'
          },
          {
            label: '平定县',
            code: '140321'
          },
          {
            label: '盂县',
            code: '140322'
          }
        ]
      },
      {
        label: '长治市',
        code: '140400',
        children: [
          {
            label: '城区',
            code: '140402'
          },
          {
            label: '郊区',
            code: '140411'
          },
          {
            label: '长治县',
            code: '140421'
          },
          {
            label: '襄垣县',
            code: '140423'
          },
          {
            label: '屯留县',
            code: '140424'
          },
          {
            label: '平顺县',
            code: '140425'
          },
          {
            label: '黎城县',
            code: '140426'
          },
          {
            label: '壶关县',
            code: '140427'
          },
          {
            label: '长子县',
            code: '140428'
          },
          {
            label: '武乡县',
            code: '140429'
          },
          {
            label: '沁县',
            code: '140430'
          },
          {
            label: '沁源县',
            code: '140431'
          },
          {
            label: '潞城市',
            code: '140481'
          }
        ]
      },
      {
        label: '晋城市',
        code: '140500',
        children: [
          {
            label: '城区',
            code: '140502'
          },
          {
            label: '沁水县',
            code: '140521'
          },
          {
            label: '阳城县',
            code: '140522'
          },
          {
            label: '陵川县',
            code: '140524'
          },
          {
            label: '泽州县',
            code: '140525'
          },
          {
            label: '高平市',
            code: '140581'
          }
        ]
      },
      {
        label: '朔州市',
        code: '140600',
        children: [
          {
            label: '朔城区',
            code: '140602'
          },
          {
            label: '平鲁区',
            code: '140603'
          },
          {
            label: '山阴县',
            code: '140621'
          },
          {
            label: '应县',
            code: '140622'
          },
          {
            label: '右玉县',
            code: '140623'
          },
          {
            label: '怀仁县',
            code: '140624'
          }
        ]
      },
      {
        label: '晋中市',
        code: '140700',
        children: [
          {
            label: '榆次区',
            code: '140702'
          },
          {
            label: '榆社县',
            code: '140721'
          },
          {
            label: '左权县',
            code: '140722'
          },
          {
            label: '和顺县',
            code: '140723'
          },
          {
            label: '昔阳县',
            code: '140724'
          },
          {
            label: '寿阳县',
            code: '140725'
          },
          {
            label: '太谷县',
            code: '140726'
          },
          {
            label: '祁县',
            code: '140727'
          },
          {
            label: '平遥县',
            code: '140728'
          },
          {
            label: '灵石县',
            code: '140729'
          },
          {
            label: '介休市',
            code: '140781'
          }
        ]
      },
      {
        label: '运城市',
        code: '140800',
        children: [
          {
            label: '盐湖区',
            code: '140802'
          },
          {
            label: '临猗县',
            code: '140821'
          },
          {
            label: '万荣县',
            code: '140822'
          },
          {
            label: '闻喜县',
            code: '140823'
          },
          {
            label: '稷山县',
            code: '140824'
          },
          {
            label: '新绛县',
            code: '140825'
          },
          {
            label: '绛县',
            code: '140826'
          },
          {
            label: '垣曲县',
            code: '140827'
          },
          {
            label: '夏县',
            code: '140828'
          },
          {
            label: '平陆县',
            code: '140829'
          },
          {
            label: '芮城县',
            code: '140830'
          },
          {
            label: '永济市',
            code: '140881'
          },
          {
            label: '河津市',
            code: '140882'
          }
        ]
      },
      {
        label: '忻州市',
        code: '140900',
        children: [
          {
            label: '忻府区',
            code: '140902'
          },
          {
            label: '定襄县',
            code: '140921'
          },
          {
            label: '五台县',
            code: '140922'
          },
          {
            label: '代县',
            code: '140923'
          },
          {
            label: '繁峙县',
            code: '140924'
          },
          {
            label: '宁武县',
            code: '140925'
          },
          {
            label: '静乐县',
            code: '140926'
          },
          {
            label: '神池县',
            code: '140927'
          },
          {
            label: '五寨县',
            code: '140928'
          },
          {
            label: '岢岚县',
            code: '140929'
          },
          {
            label: '河曲县',
            code: '140930'
          },
          {
            label: '保德县',
            code: '140931'
          },
          {
            label: '偏关县',
            code: '140932'
          },
          {
            label: '原平市',
            code: '140981'
          }
        ]
      },
      {
        label: '临汾市',
        code: '141000',
        children: [
          {
            label: '尧都区',
            code: '141002'
          },
          {
            label: '曲沃县',
            code: '141021'
          },
          {
            label: '翼城县',
            code: '141022'
          },
          {
            label: '襄汾县',
            code: '141023'
          },
          {
            label: '洪洞县',
            code: '141024'
          },
          {
            label: '古县',
            code: '141025'
          },
          {
            label: '安泽县',
            code: '141026'
          },
          {
            label: '浮山县',
            code: '141027'
          },
          {
            label: '吉县',
            code: '141028'
          },
          {
            label: '乡宁县',
            code: '141029'
          },
          {
            label: '大宁县',
            code: '141030'
          },
          {
            label: '隰县',
            code: '141031'
          },
          {
            label: '永和县',
            code: '141032'
          },
          {
            label: '蒲县',
            code: '141033'
          },
          {
            label: '汾西县',
            code: '141034'
          },
          {
            label: '侯马市',
            code: '141081'
          },
          {
            label: '霍州市',
            code: '141082'
          }
        ]
      },
      {
        label: '吕梁市',
        code: '141100',
        children: [
          {
            label: '离石区',
            code: '141102'
          },
          {
            label: '文水县',
            code: '141121'
          },
          {
            label: '交城县',
            code: '141122'
          },
          {
            label: '兴县',
            code: '141123'
          },
          {
            label: '临县',
            code: '141124'
          },
          {
            label: '柳林县',
            code: '141125'
          },
          {
            label: '石楼县',
            code: '141126'
          },
          {
            label: '岚县',
            code: '141127'
          },
          {
            label: '方山县',
            code: '141128'
          },
          {
            label: '中阳县',
            code: '141129'
          },
          {
            label: '交口县',
            code: '141130'
          },
          {
            label: '孝义市',
            code: '141181'
          },
          {
            label: '汾阳市',
            code: '141182'
          }
        ]
      }
    ]
  },
  {
    label: '内蒙古自治区',
    code: '150000',
    children: [
      {
        label: '呼和浩特市',
        code: '150100',
        children: [
          {
            label: '新城区',
            code: '150102'
          },
          {
            label: '回民区',
            code: '150103'
          },
          {
            label: '玉泉区',
            code: '150104'
          },
          {
            label: '赛罕区',
            code: '150105'
          },
          {
            label: '土默特左旗',
            code: '150121'
          },
          {
            label: '托克托县',
            code: '150122'
          },
          {
            label: '和林格尔县',
            code: '150123'
          },
          {
            label: '清水河县',
            code: '150124'
          },
          {
            label: '武川县',
            code: '150125'
          }
        ]
      },
      {
        label: '包头市',
        code: '150200',
        children: [
          {
            label: '东河区',
            code: '150202'
          },
          {
            label: '昆都仑区',
            code: '150203'
          },
          {
            label: '青山区',
            code: '150204'
          },
          {
            label: '石拐区',
            code: '150205'
          },
          {
            label: '白云鄂博矿区',
            code: '150206'
          },
          {
            label: '九原区',
            code: '150207'
          },
          {
            label: '土默特右旗',
            code: '150221'
          },
          {
            label: '固阳县',
            code: '150222'
          },
          {
            label: '达尔罕茂明安联合旗',
            code: '150223'
          }
        ]
      },
      {
        label: '乌海市',
        code: '150300',
        children: [
          {
            label: '海勃湾区',
            code: '150302'
          },
          {
            label: '海南区',
            code: '150303'
          },
          {
            label: '乌达区',
            code: '150304'
          }
        ]
      },
      {
        label: '赤峰市',
        code: '150400',
        children: [
          {
            label: '红山区',
            code: '150402'
          },
          {
            label: '元宝山区',
            code: '150403'
          },
          {
            label: '松山区',
            code: '150404'
          },
          {
            label: '阿鲁科尔沁旗',
            code: '150421'
          },
          {
            label: '巴林左旗',
            code: '150422'
          },
          {
            label: '巴林右旗',
            code: '150423'
          },
          {
            label: '林西县',
            code: '150424'
          },
          {
            label: '克什克腾旗',
            code: '150425'
          },
          {
            label: '翁牛特旗',
            code: '150426'
          },
          {
            label: '喀喇沁旗',
            code: '150428'
          },
          {
            label: '宁城县',
            code: '150429'
          },
          {
            label: '敖汉旗',
            code: '150430'
          }
        ]
      },
      {
        label: '通辽市',
        code: '150500',
        children: [
          {
            label: '科尔沁区',
            code: '150502'
          },
          {
            label: '科尔沁左翼中旗',
            code: '150521'
          },
          {
            label: '科尔沁左翼后旗',
            code: '150522'
          },
          {
            label: '开鲁县',
            code: '150523'
          },
          {
            label: '库伦旗',
            code: '150524'
          },
          {
            label: '奈曼旗',
            code: '150525'
          },
          {
            label: '扎鲁特旗',
            code: '150526'
          },
          {
            label: '霍林郭勒市',
            code: '150581'
          }
        ]
      },
      {
        label: '鄂尔多斯市',
        code: '150600',
        children: [
          {
            label: '东胜区',
            code: '150602'
          },
          {
            label: '达拉特旗',
            code: '150621'
          },
          {
            label: '准格尔旗',
            code: '150622'
          },
          {
            label: '鄂托克前旗',
            code: '150623'
          },
          {
            label: '鄂托克旗',
            code: '150624'
          },
          {
            label: '杭锦旗',
            code: '150625'
          },
          {
            label: '乌审旗',
            code: '150626'
          },
          {
            label: '伊金霍洛旗',
            code: '150627'
          }
        ]
      },
      {
        label: '呼伦贝尔市',
        code: '150700',
        children: [
          {
            label: '海拉尔区',
            code: '150702'
          },
          {
            label: '扎赉诺尔区',
            code: '150703'
          },
          {
            label: '阿荣旗',
            code: '150721'
          },
          {
            label: '莫力达瓦达斡尔族自治旗',
            code: '150722'
          },
          {
            label: '鄂伦春自治旗',
            code: '150723'
          },
          {
            label: '鄂温克族自治旗',
            code: '150724'
          },
          {
            label: '陈巴尔虎旗',
            code: '150725'
          },
          {
            label: '新巴尔虎左旗',
            code: '150726'
          },
          {
            label: '新巴尔虎右旗',
            code: '150727'
          },
          {
            label: '满洲里市',
            code: '150781'
          },
          {
            label: '牙克石市',
            code: '150782'
          },
          {
            label: '扎兰屯市',
            code: '150783'
          },
          {
            label: '额尔古纳市',
            code: '150784'
          },
          {
            label: '根河市',
            code: '150785'
          }
        ]
      },
      {
        label: '巴彦淖尔市',
        code: '150800',
        children: [
          {
            label: '临河区',
            code: '150802'
          },
          {
            label: '五原县',
            code: '150821'
          },
          {
            label: '磴口县',
            code: '150822'
          },
          {
            label: '乌拉特前旗',
            code: '150823'
          },
          {
            label: '乌拉特中旗',
            code: '150824'
          },
          {
            label: '乌拉特后旗',
            code: '150825'
          },
          {
            label: '杭锦后旗',
            code: '150826'
          }
        ]
      },
      {
        label: '乌兰察布市',
        code: '150900',
        children: [
          {
            label: '集宁区',
            code: '150902'
          },
          {
            label: '卓资县',
            code: '150921'
          },
          {
            label: '化德县',
            code: '150922'
          },
          {
            label: '商都县',
            code: '150923'
          },
          {
            label: '兴和县',
            code: '150924'
          },
          {
            label: '凉城县',
            code: '150925'
          },
          {
            label: '察哈尔右翼前旗',
            code: '150926'
          },
          {
            label: '察哈尔右翼中旗',
            code: '150927'
          },
          {
            label: '察哈尔右翼后旗',
            code: '150928'
          },
          {
            label: '四子王旗',
            code: '150929'
          },
          {
            label: '丰镇市',
            code: '150981'
          }
        ]
      },
      {
        label: '兴安盟',
        code: '152200',
        children: [
          {
            label: '乌兰浩特市',
            code: '152201'
          },
          {
            label: '阿尔山市',
            code: '152202'
          },
          {
            label: '科尔沁右翼前旗',
            code: '152221'
          },
          {
            label: '科尔沁右翼中旗',
            code: '152222'
          },
          {
            label: '扎赉特旗',
            code: '152223'
          },
          {
            label: '突泉县',
            code: '152224'
          }
        ]
      },
      {
        label: '锡林郭勒盟',
        code: '152500',
        children: [
          {
            label: '二连浩特市',
            code: '152501'
          },
          {
            label: '锡林浩特市',
            code: '152502'
          },
          {
            label: '阿巴嘎旗',
            code: '152522'
          },
          {
            label: '苏尼特左旗',
            code: '152523'
          },
          {
            label: '苏尼特右旗',
            code: '152524'
          },
          {
            label: '东乌珠穆沁旗',
            code: '152525'
          },
          {
            label: '西乌珠穆沁旗',
            code: '152526'
          },
          {
            label: '太仆寺旗',
            code: '152527'
          },
          {
            label: '镶黄旗',
            code: '152528'
          },
          {
            label: '正镶白旗',
            code: '152529'
          },
          {
            label: '正蓝旗',
            code: '152530'
          },
          {
            label: '多伦县',
            code: '152531'
          }
        ]
      },
      {
        label: '阿拉善盟',
        code: '152900',
        children: [
          {
            label: '阿拉善左旗',
            code: '152921'
          },
          {
            label: '阿拉善右旗',
            code: '152922'
          },
          {
            label: '额济纳旗',
            code: '152923'
          }
        ]
      }
    ]
  },
  {
    label: '辽宁省',
    code: '210000',
    children: [
      {
        label: '沈阳市',
        code: '210100',
        children: [
          {
            label: '和平区',
            code: '210102'
          },
          {
            label: '沈河区',
            code: '210103'
          },
          {
            label: '大东区',
            code: '210104'
          },
          {
            label: '皇姑区',
            code: '210105'
          },
          {
            label: '铁西区',
            code: '210106'
          },
          {
            label: '苏家屯区',
            code: '210111'
          },
          {
            label: '浑南区',
            code: '210112'
          },
          {
            label: '沈北新区',
            code: '210113'
          },
          {
            label: '于洪区',
            code: '210114'
          },
          {
            label: '辽中县',
            code: '210122'
          },
          {
            label: '康平县',
            code: '210123'
          },
          {
            label: '法库县',
            code: '210124'
          },
          {
            label: '新民市',
            code: '210181'
          }
        ]
      },
      {
        label: '大连市',
        code: '210200',
        children: [
          {
            label: '中山区',
            code: '210202'
          },
          {
            label: '西岗区',
            code: '210203'
          },
          {
            label: '沙河口区',
            code: '210204'
          },
          {
            label: '甘井子区',
            code: '210211'
          },
          {
            label: '旅顺口区',
            code: '210212'
          },
          {
            label: '金州区',
            code: '210213'
          },
          {
            label: '长海县',
            code: '210224'
          },
          {
            label: '瓦房店市',
            code: '210281'
          },
          {
            label: '普兰店市',
            code: '210282'
          },
          {
            label: '庄河市',
            code: '210283'
          }
        ]
      },
      {
        label: '鞍山市',
        code: '210300',
        children: [
          {
            label: '铁东区',
            code: '210302'
          },
          {
            label: '铁西区',
            code: '210303'
          },
          {
            label: '立山区',
            code: '210304'
          },
          {
            label: '千山区',
            code: '210311'
          },
          {
            label: '台安县',
            code: '210321'
          },
          {
            label: '岫岩满族自治县',
            code: '210323'
          },
          {
            label: '海城市',
            code: '210381'
          }
        ]
      },
      {
        label: '抚顺市',
        code: '210400',
        children: [
          {
            label: '新抚区',
            code: '210402'
          },
          {
            label: '东洲区',
            code: '210403'
          },
          {
            label: '望花区',
            code: '210404'
          },
          {
            label: '顺城区',
            code: '210411'
          },
          {
            label: '抚顺县',
            code: '210421'
          },
          {
            label: '新宾满族自治县',
            code: '210422'
          },
          {
            label: '清原满族自治县',
            code: '210423'
          }
        ]
      },
      {
        label: '本溪市',
        code: '210500',
        children: [
          {
            label: '平山区',
            code: '210502'
          },
          {
            label: '溪湖区',
            code: '210503'
          },
          {
            label: '明山区',
            code: '210504'
          },
          {
            label: '南芬区',
            code: '210505'
          },
          {
            label: '本溪满族自治县',
            code: '210521'
          },
          {
            label: '桓仁满族自治县',
            code: '210522'
          }
        ]
      },
      {
        label: '丹东市',
        code: '210600',
        children: [
          {
            label: '元宝区',
            code: '210602'
          },
          {
            label: '振兴区',
            code: '210603'
          },
          {
            label: '振安区',
            code: '210604'
          },
          {
            label: '宽甸满族自治县',
            code: '210624'
          },
          {
            label: '东港市',
            code: '210681'
          },
          {
            label: '凤城市',
            code: '210682'
          }
        ]
      },
      {
        label: '锦州市',
        code: '210700',
        children: [
          {
            label: '古塔区',
            code: '210702'
          },
          {
            label: '凌河区',
            code: '210703'
          },
          {
            label: '太和区',
            code: '210711'
          },
          {
            label: '黑山县',
            code: '210726'
          },
          {
            label: '义县',
            code: '210727'
          },
          {
            label: '凌海市',
            code: '210781'
          },
          {
            label: '北镇市',
            code: '210782'
          }
        ]
      },
      {
        label: '营口市',
        code: '210800',
        children: [
          {
            label: '站前区',
            code: '210802'
          },
          {
            label: '西市区',
            code: '210803'
          },
          {
            label: '鲅鱼圈区',
            code: '210804'
          },
          {
            label: '老边区',
            code: '210811'
          },
          {
            label: '盖州市',
            code: '210881'
          },
          {
            label: '大石桥市',
            code: '210882'
          }
        ]
      },
      {
        label: '阜新市',
        code: '210900',
        children: [
          {
            label: '海州区',
            code: '210902'
          },
          {
            label: '新邱区',
            code: '210903'
          },
          {
            label: '太平区',
            code: '210904'
          },
          {
            label: '清河门区',
            code: '210905'
          },
          {
            label: '细河区',
            code: '210911'
          },
          {
            label: '阜新蒙古族自治县',
            code: '210921'
          },
          {
            label: '彰武县',
            code: '210922'
          }
        ]
      },
      {
        label: '辽阳市',
        code: '211000',
        children: [
          {
            label: '白塔区',
            code: '211002'
          },
          {
            label: '文圣区',
            code: '211003'
          },
          {
            label: '宏伟区',
            code: '211004'
          },
          {
            label: '弓长岭区',
            code: '211005'
          },
          {
            label: '太子河区',
            code: '211011'
          },
          {
            label: '辽阳县',
            code: '211021'
          },
          {
            label: '灯塔市',
            code: '211081'
          }
        ]
      },
      {
        label: '盘锦市',
        code: '211100',
        children: [
          {
            label: '双台子区',
            code: '211102'
          },
          {
            label: '兴隆台区',
            code: '211103'
          },
          {
            label: '大洼县',
            code: '211121'
          },
          {
            label: '盘山县',
            code: '211122'
          }
        ]
      },
      {
        label: '铁岭市',
        code: '211200',
        children: [
          {
            label: '银州区',
            code: '211202'
          },
          {
            label: '清河区',
            code: '211204'
          },
          {
            label: '铁岭县',
            code: '211221'
          },
          {
            label: '西丰县',
            code: '211223'
          },
          {
            label: '昌图县',
            code: '211224'
          },
          {
            label: '调兵山市',
            code: '211281'
          },
          {
            label: '开原市',
            code: '211282'
          }
        ]
      },
      {
        label: '朝阳市',
        code: '211300',
        children: [
          {
            label: '双塔区',
            code: '211302'
          },
          {
            label: '龙城区',
            code: '211303'
          },
          {
            label: '朝阳县',
            code: '211321'
          },
          {
            label: '建平县',
            code: '211322'
          },
          {
            label: '喀喇沁左翼蒙古族自治县',
            code: '211324'
          },
          {
            label: '北票市',
            code: '211381'
          },
          {
            label: '凌源市',
            code: '211382'
          }
        ]
      },
      {
        label: '葫芦岛市',
        code: '211400',
        children: [
          {
            label: '连山区',
            code: '211402'
          },
          {
            label: '龙港区',
            code: '211403'
          },
          {
            label: '南票区',
            code: '211404'
          },
          {
            label: '绥中县',
            code: '211421'
          },
          {
            label: '建昌县',
            code: '211422'
          },
          {
            label: '兴城市',
            code: '211481'
          }
        ]
      },
      {
        label: '金普新区',
        code: '211500',
        children: [
          {
            label: '金州新区',
            code: '211501'
          },
          {
            label: '普湾新区',
            code: '211502'
          },
          {
            label: '保税区',
            code: '211503'
          }
        ]
      }
    ]
  },
  {
    label: '吉林省',
    code: '220000',
    children: [
      {
        label: '长春市',
        code: '220100',
        children: [
          {
            label: '南关区',
            code: '220102'
          },
          {
            label: '宽城区',
            code: '220103'
          },
          {
            label: '朝阳区',
            code: '220104'
          },
          {
            label: '二道区',
            code: '220105'
          },
          {
            label: '绿园区',
            code: '220106'
          },
          {
            label: '双阳区',
            code: '220112'
          },
          {
            label: '九台区',
            code: '220113'
          },
          {
            label: '农安县',
            code: '220122'
          },
          {
            label: '榆树市',
            code: '220182'
          },
          {
            label: '德惠市',
            code: '220183'
          }
        ]
      },
      {
        label: '吉林市',
        code: '220200',
        children: [
          {
            label: '昌邑区',
            code: '220202'
          },
          {
            label: '龙潭区',
            code: '220203'
          },
          {
            label: '船营区',
            code: '220204'
          },
          {
            label: '丰满区',
            code: '220211'
          },
          {
            label: '永吉县',
            code: '220221'
          },
          {
            label: '蛟河市',
            code: '220281'
          },
          {
            label: '桦甸市',
            code: '220282'
          },
          {
            label: '舒兰市',
            code: '220283'
          },
          {
            label: '磐石市',
            code: '220284'
          }
        ]
      },
      {
        label: '四平市',
        code: '220300',
        children: [
          {
            label: '铁西区',
            code: '220302'
          },
          {
            label: '铁东区',
            code: '220303'
          },
          {
            label: '梨树县',
            code: '220322'
          },
          {
            label: '伊通满族自治县',
            code: '220323'
          },
          {
            label: '公主岭市',
            code: '220381'
          },
          {
            label: '双辽市',
            code: '220382'
          }
        ]
      },
      {
        label: '辽源市',
        code: '220400',
        children: [
          {
            label: '龙山区',
            code: '220402'
          },
          {
            label: '西安区',
            code: '220403'
          },
          {
            label: '东丰县',
            code: '220421'
          },
          {
            label: '东辽县',
            code: '220422'
          }
        ]
      },
      {
        label: '通化市',
        code: '220500',
        children: [
          {
            label: '东昌区',
            code: '220502'
          },
          {
            label: '二道江区',
            code: '220503'
          },
          {
            label: '通化县',
            code: '220521'
          },
          {
            label: '辉南县',
            code: '220523'
          },
          {
            label: '柳河县',
            code: '220524'
          },
          {
            label: '梅河口市',
            code: '220581'
          },
          {
            label: '集安市',
            code: '220582'
          }
        ]
      },
      {
        label: '白山市',
        code: '220600',
        children: [
          {
            label: '浑江区',
            code: '220602'
          },
          {
            label: '江源区',
            code: '220605'
          },
          {
            label: '抚松县',
            code: '220621'
          },
          {
            label: '靖宇县',
            code: '220622'
          },
          {
            label: '长白朝鲜族自治县',
            code: '220623'
          },
          {
            label: '临江市',
            code: '220681'
          }
        ]
      },
      {
        label: '松原市',
        code: '220700',
        children: [
          {
            label: '宁江区',
            code: '220702'
          },
          {
            label: '前郭尔罗斯蒙古族自治县',
            code: '220721'
          },
          {
            label: '长岭县',
            code: '220722'
          },
          {
            label: '乾安县',
            code: '220723'
          },
          {
            label: '扶余市',
            code: '220781'
          }
        ]
      },
      {
        label: '白城市',
        code: '220800',
        children: [
          {
            label: '洮北区',
            code: '220802'
          },
          {
            label: '镇赉县',
            code: '220821'
          },
          {
            label: '通榆县',
            code: '220822'
          },
          {
            label: '洮南市',
            code: '220881'
          },
          {
            label: '大安市',
            code: '220882'
          }
        ]
      },
      {
        label: '延边朝鲜族自治州',
        code: '222400',
        children: [
          {
            label: '延吉市',
            code: '222401'
          },
          {
            label: '图们市',
            code: '222402'
          },
          {
            label: '敦化市',
            code: '222403'
          },
          {
            label: '珲春市',
            code: '222404'
          },
          {
            label: '龙井市',
            code: '222405'
          },
          {
            label: '和龙市',
            code: '222406'
          },
          {
            label: '汪清县',
            code: '222424'
          },
          {
            label: '安图县',
            code: '222426'
          }
        ]
      }
    ]
  },
  {
    label: '黑龙江省',
    code: '230000',
    children: [
      {
        label: '哈尔滨市',
        code: '230100',
        children: [
          {
            label: '道里区',
            code: '230102'
          },
          {
            label: '南岗区',
            code: '230103'
          },
          {
            label: '道外区',
            code: '230104'
          },
          {
            label: '平房区',
            code: '230108'
          },
          {
            label: '松北区',
            code: '230109'
          },
          {
            label: '香坊区',
            code: '230110'
          },
          {
            label: '呼兰区',
            code: '230111'
          },
          {
            label: '阿城区',
            code: '230112'
          },
          {
            label: '双城区',
            code: '230113'
          },
          {
            label: '依兰县',
            code: '230123'
          },
          {
            label: '方正县',
            code: '230124'
          },
          {
            label: '宾县',
            code: '230125'
          },
          {
            label: '巴彦县',
            code: '230126'
          },
          {
            label: '木兰县',
            code: '230127'
          },
          {
            label: '通河县',
            code: '230128'
          },
          {
            label: '延寿县',
            code: '230129'
          },
          {
            label: '尚志市',
            code: '230183'
          },
          {
            label: '五常市',
            code: '230184'
          }
        ]
      },
      {
        label: '齐齐哈尔市',
        code: '230200',
        children: [
          {
            label: '龙沙区',
            code: '230202'
          },
          {
            label: '建华区',
            code: '230203'
          },
          {
            label: '铁锋区',
            code: '230204'
          },
          {
            label: '昂昂溪区',
            code: '230205'
          },
          {
            label: '富拉尔基区',
            code: '230206'
          },
          {
            label: '碾子山区',
            code: '230207'
          },
          {
            label: '梅里斯达斡尔族区',
            code: '230208'
          },
          {
            label: '龙江县',
            code: '230221'
          },
          {
            label: '依安县',
            code: '230223'
          },
          {
            label: '泰来县',
            code: '230224'
          },
          {
            label: '甘南县',
            code: '230225'
          },
          {
            label: '富裕县',
            code: '230227'
          },
          {
            label: '克山县',
            code: '230229'
          },
          {
            label: '克东县',
            code: '230230'
          },
          {
            label: '拜泉县',
            code: '230231'
          },
          {
            label: '讷河市',
            code: '230281'
          }
        ]
      },
      {
        label: '鸡西市',
        code: '230300',
        children: [
          {
            label: '鸡冠区',
            code: '230302'
          },
          {
            label: '恒山区',
            code: '230303'
          },
          {
            label: '滴道区',
            code: '230304'
          },
          {
            label: '梨树区',
            code: '230305'
          },
          {
            label: '城子河区',
            code: '230306'
          },
          {
            label: '麻山区',
            code: '230307'
          },
          {
            label: '鸡东县',
            code: '230321'
          },
          {
            label: '虎林市',
            code: '230381'
          },
          {
            label: '密山市',
            code: '230382'
          }
        ]
      },
      {
        label: '鹤岗市',
        code: '230400',
        children: [
          {
            label: '向阳区',
            code: '230402'
          },
          {
            label: '工农区',
            code: '230403'
          },
          {
            label: '南山区',
            code: '230404'
          },
          {
            label: '兴安区',
            code: '230405'
          },
          {
            label: '东山区',
            code: '230406'
          },
          {
            label: '兴山区',
            code: '230407'
          },
          {
            label: '萝北县',
            code: '230421'
          },
          {
            label: '绥滨县',
            code: '230422'
          }
        ]
      },
      {
        label: '双鸭山市',
        code: '230500',
        children: [
          {
            label: '尖山区',
            code: '230502'
          },
          {
            label: '岭东区',
            code: '230503'
          },
          {
            label: '四方台区',
            code: '230505'
          },
          {
            label: '宝山区',
            code: '230506'
          },
          {
            label: '集贤县',
            code: '230521'
          },
          {
            label: '友谊县',
            code: '230522'
          },
          {
            label: '宝清县',
            code: '230523'
          },
          {
            label: '饶河县',
            code: '230524'
          }
        ]
      },
      {
        label: '大庆市',
        code: '230600',
        children: [
          {
            label: '萨尔图区',
            code: '230602'
          },
          {
            label: '龙凤区',
            code: '230603'
          },
          {
            label: '让胡路区',
            code: '230604'
          },
          {
            label: '红岗区',
            code: '230605'
          },
          {
            label: '大同区',
            code: '230606'
          },
          {
            label: '肇州县',
            code: '230621'
          },
          {
            label: '肇源县',
            code: '230622'
          },
          {
            label: '林甸县',
            code: '230623'
          },
          {
            label: '杜尔伯特蒙古族自治县',
            code: '230624'
          }
        ]
      },
      {
        label: '伊春市',
        code: '230700',
        children: [
          {
            label: '伊春区',
            code: '230702'
          },
          {
            label: '南岔区',
            code: '230703'
          },
          {
            label: '友好区',
            code: '230704'
          },
          {
            label: '西林区',
            code: '230705'
          },
          {
            label: '翠峦区',
            code: '230706'
          },
          {
            label: '新青区',
            code: '230707'
          },
          {
            label: '美溪区',
            code: '230708'
          },
          {
            label: '金山屯区',
            code: '230709'
          },
          {
            label: '五营区',
            code: '230710'
          },
          {
            label: '乌马河区',
            code: '230711'
          },
          {
            label: '汤旺河区',
            code: '230712'
          },
          {
            label: '带岭区',
            code: '230713'
          },
          {
            label: '乌伊岭区',
            code: '230714'
          },
          {
            label: '红星区',
            code: '230715'
          },
          {
            label: '上甘岭区',
            code: '230716'
          },
          {
            label: '嘉荫县',
            code: '230722'
          },
          {
            label: '铁力市',
            code: '230781'
          }
        ]
      },
      {
        label: '佳木斯市',
        code: '230800',
        children: [
          {
            label: '向阳区',
            code: '230803'
          },
          {
            label: '前进区',
            code: '230804'
          },
          {
            label: '东风区',
            code: '230805'
          },
          {
            label: '郊区',
            code: '230811'
          },
          {
            label: '桦南县',
            code: '230822'
          },
          {
            label: '桦川县',
            code: '230826'
          },
          {
            label: '汤原县',
            code: '230828'
          },
          {
            label: '抚远县',
            code: '230833'
          },
          {
            label: '同江市',
            code: '230881'
          },
          {
            label: '富锦市',
            code: '230882'
          }
        ]
      },
      {
        label: '七台河市',
        code: '230900',
        children: [
          {
            label: '新兴区',
            code: '230902'
          },
          {
            label: '桃山区',
            code: '230903'
          },
          {
            label: '茄子河区',
            code: '230904'
          },
          {
            label: '勃利县',
            code: '230921'
          }
        ]
      },
      {
        label: '牡丹江市',
        code: '231000',
        children: [
          {
            label: '东安区',
            code: '231002'
          },
          {
            label: '阳明区',
            code: '231003'
          },
          {
            label: '爱民区',
            code: '231004'
          },
          {
            label: '西安区',
            code: '231005'
          },
          {
            label: '东宁县',
            code: '231024'
          },
          {
            label: '林口县',
            code: '231025'
          },
          {
            label: '绥芬河市',
            code: '231081'
          },
          {
            label: '海林市',
            code: '231083'
          },
          {
            label: '宁安市',
            code: '231084'
          },
          {
            label: '穆棱市',
            code: '231085'
          }
        ]
      },
      {
        label: '黑河市',
        code: '231100',
        children: [
          {
            label: '爱辉区',
            code: '231102'
          },
          {
            label: '嫩江县',
            code: '231121'
          },
          {
            label: '逊克县',
            code: '231123'
          },
          {
            label: '孙吴县',
            code: '231124'
          },
          {
            label: '北安市',
            code: '231181'
          },
          {
            label: '五大连池市',
            code: '231182'
          }
        ]
      },
      {
        label: '绥化市',
        code: '231200',
        children: [
          {
            label: '北林区',
            code: '231202'
          },
          {
            label: '望奎县',
            code: '231221'
          },
          {
            label: '兰西县',
            code: '231222'
          },
          {
            label: '青冈县',
            code: '231223'
          },
          {
            label: '庆安县',
            code: '231224'
          },
          {
            label: '明水县',
            code: '231225'
          },
          {
            label: '绥棱县',
            code: '231226'
          },
          {
            label: '安达市',
            code: '231281'
          },
          {
            label: '肇东市',
            code: '231282'
          },
          {
            label: '海伦市',
            code: '231283'
          }
        ]
      },
      {
        label: '大兴安岭地区',
        code: '232700',
        children: [
          {
            label: '加格达奇区',
            code: '232701'
          },
          {
            label: '新林区',
            code: '232702'
          },
          {
            label: '松岭区',
            code: '232703'
          },
          {
            label: '呼中区',
            code: '232704'
          },
          {
            label: '呼玛县',
            code: '232721'
          },
          {
            label: '塔河县',
            code: '232722'
          },
          {
            label: '漠河县',
            code: '232723'
          }
        ]
      }
    ]
  },
  {
    label: '上海',
    code: '310000',
    children: [
      {
        label: '上海市',
        code: '310100',
        children: [
          {
            label: '黄浦区',
            code: '310101'
          },
          {
            label: '徐汇区',
            code: '310104'
          },
          {
            label: '长宁区',
            code: '310105'
          },
          {
            label: '静安区',
            code: '310106'
          },
          {
            label: '普陀区',
            code: '310107'
          },
          {
            label: '闸北区',
            code: '310108'
          },
          {
            label: '虹口区',
            code: '310109'
          },
          {
            label: '杨浦区',
            code: '310110'
          },
          {
            label: '闵行区',
            code: '310112'
          },
          {
            label: '宝山区',
            code: '310113'
          },
          {
            label: '嘉定区',
            code: '310114'
          },
          {
            label: '浦东新区',
            code: '310115'
          },
          {
            label: '金山区',
            code: '310116'
          },
          {
            label: '松江区',
            code: '310117'
          },
          {
            label: '青浦区',
            code: '310118'
          },
          {
            label: '奉贤区',
            code: '310120'
          }
        ]
      },
      {
        label: '县',
        code: '310200',
        children: [
          {
            label: '崇明县',
            code: '310230'
          }
        ]
      }
    ]
  },
  {
    label: '江苏省',
    code: '320000',
    children: [
      {
        label: '南京市',
        code: '320100',
        children: [
          {
            label: '玄武区',
            code: '320102'
          },
          {
            label: '秦淮区',
            code: '320104'
          },
          {
            label: '建邺区',
            code: '320105'
          },
          {
            label: '鼓楼区',
            code: '320106'
          },
          {
            label: '浦口区',
            code: '320111'
          },
          {
            label: '栖霞区',
            code: '320113'
          },
          {
            label: '雨花台区',
            code: '320114'
          },
          {
            label: '江宁区',
            code: '320115'
          },
          {
            label: '六合区',
            code: '320116'
          },
          {
            label: '溧水区',
            code: '320117'
          },
          {
            label: '高淳区',
            code: '320118'
          }
        ]
      },
      {
        label: '无锡市',
        code: '320200',
        children: [
          {
            label: '崇安区',
            code: '320202'
          },
          {
            label: '南长区',
            code: '320203'
          },
          {
            label: '北塘区',
            code: '320204'
          },
          {
            label: '锡山区',
            code: '320205'
          },
          {
            label: '惠山区',
            code: '320206'
          },
          {
            label: '滨湖区',
            code: '320211'
          },
          {
            label: '江阴市',
            code: '320281'
          },
          {
            label: '宜兴市',
            code: '320282'
          }
        ]
      },
      {
        label: '徐州市',
        code: '320300',
        children: [
          {
            label: '鼓楼区',
            code: '320302'
          },
          {
            label: '云龙区',
            code: '320303'
          },
          {
            label: '贾汪区',
            code: '320305'
          },
          {
            label: '泉山区',
            code: '320311'
          },
          {
            label: '铜山区',
            code: '320312'
          },
          {
            label: '丰县',
            code: '320321'
          },
          {
            label: '沛县',
            code: '320322'
          },
          {
            label: '睢宁县',
            code: '320324'
          },
          {
            label: '新沂市',
            code: '320381'
          },
          {
            label: '邳州市',
            code: '320382'
          }
        ]
      },
      {
        label: '常州市',
        code: '320400',
        children: [
          {
            label: '天宁区',
            code: '320402'
          },
          {
            label: '钟楼区',
            code: '320404'
          },
          {
            label: '戚墅堰区',
            code: '320405'
          },
          {
            label: '新北区',
            code: '320411'
          },
          {
            label: '武进区',
            code: '320412'
          },
          {
            label: '溧阳市',
            code: '320481'
          },
          {
            label: '金坛市',
            code: '320482'
          }
        ]
      },
      {
        label: '苏州市',
        code: '320500',
        children: [
          {
            label: '虎丘区',
            code: '320505'
          },
          {
            label: '吴中区',
            code: '320506'
          },
          {
            label: '相城区',
            code: '320507'
          },
          {
            label: '姑苏区',
            code: '320508'
          },
          {
            label: '吴江区',
            code: '320509'
          },
          {
            label: '常熟市',
            code: '320581'
          },
          {
            label: '张家港市',
            code: '320582'
          },
          {
            label: '昆山市',
            code: '320583'
          },
          {
            label: '太仓市',
            code: '320585'
          }
        ]
      },
      {
        label: '南通市',
        code: '320600',
        children: [
          {
            label: '崇川区',
            code: '320602'
          },
          {
            label: '港闸区',
            code: '320611'
          },
          {
            label: '通州区',
            code: '320612'
          },
          {
            label: '海安县',
            code: '320621'
          },
          {
            label: '如东县',
            code: '320623'
          },
          {
            label: '启东市',
            code: '320681'
          },
          {
            label: '如皋市',
            code: '320682'
          },
          {
            label: '海门市',
            code: '320684'
          }
        ]
      },
      {
        label: '连云港市',
        code: '320700',
        children: [
          {
            label: '连云区',
            code: '320703'
          },
          {
            label: '海州区',
            code: '320706'
          },
          {
            label: '赣榆区',
            code: '320707'
          },
          {
            label: '东海县',
            code: '320722'
          },
          {
            label: '灌云县',
            code: '320723'
          },
          {
            label: '灌南县',
            code: '320724'
          }
        ]
      },
      {
        label: '淮安市',
        code: '320800',
        children: [
          {
            label: '清河区',
            code: '320802'
          },
          {
            label: '淮安区',
            code: '320803'
          },
          {
            label: '淮阴区',
            code: '320804'
          },
          {
            label: '清浦区',
            code: '320811'
          },
          {
            label: '涟水县',
            code: '320826'
          },
          {
            label: '洪泽县',
            code: '320829'
          },
          {
            label: '盱眙县',
            code: '320830'
          },
          {
            label: '金湖县',
            code: '320831'
          }
        ]
      },
      {
        label: '盐城市',
        code: '320900',
        children: [
          {
            label: '亭湖区',
            code: '320902'
          },
          {
            label: '盐都区',
            code: '320903'
          },
          {
            label: '响水县',
            code: '320921'
          },
          {
            label: '滨海县',
            code: '320922'
          },
          {
            label: '阜宁县',
            code: '320923'
          },
          {
            label: '射阳县',
            code: '320924'
          },
          {
            label: '建湖县',
            code: '320925'
          },
          {
            label: '东台市',
            code: '320981'
          },
          {
            label: '大丰市',
            code: '320982'
          }
        ]
      },
      {
        label: '扬州市',
        code: '321000',
        children: [
          {
            label: '广陵区',
            code: '321002'
          },
          {
            label: '邗江区',
            code: '321003'
          },
          {
            label: '江都区',
            code: '321012'
          },
          {
            label: '宝应县',
            code: '321023'
          },
          {
            label: '仪征市',
            code: '321081'
          },
          {
            label: '高邮市',
            code: '321084'
          }
        ]
      },
      {
        label: '镇江市',
        code: '321100',
        children: [
          {
            label: '京口区',
            code: '321102'
          },
          {
            label: '润州区',
            code: '321111'
          },
          {
            label: '丹徒区',
            code: '321112'
          },
          {
            label: '丹阳市',
            code: '321181'
          },
          {
            label: '扬中市',
            code: '321182'
          },
          {
            label: '句容市',
            code: '321183'
          }
        ]
      },
      {
        label: '泰州市',
        code: '321200',
        children: [
          {
            label: '海陵区',
            code: '321202'
          },
          {
            label: '高港区',
            code: '321203'
          },
          {
            label: '姜堰区',
            code: '321204'
          },
          {
            label: '兴化市',
            code: '321281'
          },
          {
            label: '靖江市',
            code: '321282'
          },
          {
            label: '泰兴市',
            code: '321283'
          }
        ]
      },
      {
        label: '宿迁市',
        code: '321300',
        children: [
          {
            label: '宿城区',
            code: '321302'
          },
          {
            label: '宿豫区',
            code: '321311'
          },
          {
            label: '沭阳县',
            code: '321322'
          },
          {
            label: '泗阳县',
            code: '321323'
          },
          {
            label: '泗洪县',
            code: '321324'
          }
        ]
      }
    ]
  },
  {
    label: '浙江省',
    code: '330000',
    children: [
      {
        label: '杭州市',
        code: '330100',
        children: [
          {
            label: '上城区',
            code: '330102'
          },
          {
            label: '下城区',
            code: '330103'
          },
          {
            label: '江干区',
            code: '330104'
          },
          {
            label: '拱墅区',
            code: '330105'
          },
          {
            label: '西湖区',
            code: '330106'
          },
          {
            label: '滨江区',
            code: '330108'
          },
          {
            label: '萧山区',
            code: '330109'
          },
          {
            label: '余杭区',
            code: '330110'
          },
          {
            label: '桐庐县',
            code: '330122'
          },
          {
            label: '淳安县',
            code: '330127'
          },
          {
            label: '建德市',
            code: '330182'
          },
          {
            label: '富阳区',
            code: '330183'
          },
          {
            label: '临安市',
            code: '330185'
          }
        ]
      },
      {
        label: '宁波市',
        code: '330200',
        children: [
          {
            label: '海曙区',
            code: '330203'
          },
          {
            label: '江东区',
            code: '330204'
          },
          {
            label: '江北区',
            code: '330205'
          },
          {
            label: '北仑区',
            code: '330206'
          },
          {
            label: '镇海区',
            code: '330211'
          },
          {
            label: '鄞州区',
            code: '330212'
          },
          {
            label: '象山县',
            code: '330225'
          },
          {
            label: '宁海县',
            code: '330226'
          },
          {
            label: '余姚市',
            code: '330281'
          },
          {
            label: '慈溪市',
            code: '330282'
          },
          {
            label: '奉化市',
            code: '330283'
          }
        ]
      },
      {
        label: '温州市',
        code: '330300',
        children: [
          {
            label: '鹿城区',
            code: '330302'
          },
          {
            label: '龙湾区',
            code: '330303'
          },
          {
            label: '瓯海区',
            code: '330304'
          },
          {
            label: '洞头县',
            code: '330322'
          },
          {
            label: '永嘉县',
            code: '330324'
          },
          {
            label: '平阳县',
            code: '330326'
          },
          {
            label: '苍南县',
            code: '330327'
          },
          {
            label: '文成县',
            code: '330328'
          },
          {
            label: '泰顺县',
            code: '330329'
          },
          {
            label: '瑞安市',
            code: '330381'
          },
          {
            label: '乐清市',
            code: '330382'
          }
        ]
      },
      {
        label: '嘉兴市',
        code: '330400',
        children: [
          {
            label: '南湖区',
            code: '330402'
          },
          {
            label: '秀洲区',
            code: '330411'
          },
          {
            label: '嘉善县',
            code: '330421'
          },
          {
            label: '海盐县',
            code: '330424'
          },
          {
            label: '海宁市',
            code: '330481'
          },
          {
            label: '平湖市',
            code: '330482'
          },
          {
            label: '桐乡市',
            code: '330483'
          }
        ]
      },
      {
        label: '湖州市',
        code: '330500',
        children: [
          {
            label: '吴兴区',
            code: '330502'
          },
          {
            label: '南浔区',
            code: '330503'
          },
          {
            label: '德清县',
            code: '330521'
          },
          {
            label: '长兴县',
            code: '330522'
          },
          {
            label: '安吉县',
            code: '330523'
          }
        ]
      },
      {
        label: '绍兴市',
        code: '330600',
        children: [
          {
            label: '越城区',
            code: '330602'
          },
          {
            label: '柯桥区',
            code: '330603'
          },
          {
            label: '上虞区',
            code: '330604'
          },
          {
            label: '新昌县',
            code: '330624'
          },
          {
            label: '诸暨市',
            code: '330681'
          },
          {
            label: '嵊州市',
            code: '330683'
          }
        ]
      },
      {
        label: '金华市',
        code: '330700',
        children: [
          {
            label: '婺城区',
            code: '330702'
          },
          {
            label: '金东区',
            code: '330703'
          },
          {
            label: '武义县',
            code: '330723'
          },
          {
            label: '浦江县',
            code: '330726'
          },
          {
            label: '磐安县',
            code: '330727'
          },
          {
            label: '兰溪市',
            code: '330781'
          },
          {
            label: '义乌市',
            code: '330782'
          },
          {
            label: '东阳市',
            code: '330783'
          },
          {
            label: '永康市',
            code: '330784'
          }
        ]
      },
      {
        label: '衢州市',
        code: '330800',
        children: [
          {
            label: '柯城区',
            code: '330802'
          },
          {
            label: '衢江区',
            code: '330803'
          },
          {
            label: '常山县',
            code: '330822'
          },
          {
            label: '开化县',
            code: '330824'
          },
          {
            label: '龙游县',
            code: '330825'
          },
          {
            label: '江山市',
            code: '330881'
          }
        ]
      },
      {
        label: '舟山市',
        code: '330900',
        children: [
          {
            label: '定海区',
            code: '330902'
          },
          {
            label: '普陀区',
            code: '330903'
          },
          {
            label: '岱山县',
            code: '330921'
          },
          {
            label: '嵊泗县',
            code: '330922'
          }
        ]
      },
      {
        label: '台州市',
        code: '331000',
        children: [
          {
            label: '椒江区',
            code: '331002'
          },
          {
            label: '黄岩区',
            code: '331003'
          },
          {
            label: '路桥区',
            code: '331004'
          },
          {
            label: '玉环县',
            code: '331021'
          },
          {
            label: '三门县',
            code: '331022'
          },
          {
            label: '天台县',
            code: '331023'
          },
          {
            label: '仙居县',
            code: '331024'
          },
          {
            label: '温岭市',
            code: '331081'
          },
          {
            label: '临海市',
            code: '331082'
          }
        ]
      },
      {
        label: '丽水市',
        code: '331100',
        children: [
          {
            label: '莲都区',
            code: '331102'
          },
          {
            label: '青田县',
            code: '331121'
          },
          {
            label: '缙云县',
            code: '331122'
          },
          {
            label: '遂昌县',
            code: '331123'
          },
          {
            label: '松阳县',
            code: '331124'
          },
          {
            label: '云和县',
            code: '331125'
          },
          {
            label: '庆元县',
            code: '331126'
          },
          {
            label: '景宁畲族自治县',
            code: '331127'
          },
          {
            label: '龙泉市',
            code: '331181'
          }
        ]
      },
      {
        label: '舟山群岛新区',
        code: '331200',
        children: [
          {
            label: '金塘岛',
            code: '331201'
          },
          {
            label: '六横岛',
            code: '331202'
          },
          {
            label: '衢山岛',
            code: '331203'
          },
          {
            label: '舟山本岛西北部',
            code: '331204'
          },
          {
            label: '岱山岛西南部',
            code: '331205'
          },
          {
            label: '泗礁岛',
            code: '331206'
          },
          {
            label: '朱家尖岛',
            code: '331207'
          },
          {
            label: '洋山岛',
            code: '331208'
          },
          {
            label: '长涂岛',
            code: '331209'
          },
          {
            label: '虾峙岛',
            code: '331210'
          }
        ]
      }
    ]
  },
  {
    label: '安徽省',
    code: '340000',
    children: [
      {
        label: '合肥市',
        code: '340100',
        children: [
          {
            label: '瑶海区',
            code: '340102'
          },
          {
            label: '庐阳区',
            code: '340103'
          },
          {
            label: '蜀山区',
            code: '340104'
          },
          {
            label: '包河区',
            code: '340111'
          },
          {
            label: '长丰县',
            code: '340121'
          },
          {
            label: '肥东县',
            code: '340122'
          },
          {
            label: '肥西县',
            code: '340123'
          },
          {
            label: '庐江县',
            code: '340124'
          },
          {
            label: '巢湖市',
            code: '340181'
          }
        ]
      },
      {
        label: '芜湖市',
        code: '340200',
        children: [
          {
            label: '镜湖区',
            code: '340202'
          },
          {
            label: '弋江区',
            code: '340203'
          },
          {
            label: '鸠江区',
            code: '340207'
          },
          {
            label: '三山区',
            code: '340208'
          },
          {
            label: '芜湖县',
            code: '340221'
          },
          {
            label: '繁昌县',
            code: '340222'
          },
          {
            label: '南陵县',
            code: '340223'
          },
          {
            label: '无为县',
            code: '340225'
          }
        ]
      },
      {
        label: '蚌埠市',
        code: '340300',
        children: [
          {
            label: '龙子湖区',
            code: '340302'
          },
          {
            label: '蚌山区',
            code: '340303'
          },
          {
            label: '禹会区',
            code: '340304'
          },
          {
            label: '淮上区',
            code: '340311'
          },
          {
            label: '怀远县',
            code: '340321'
          },
          {
            label: '五河县',
            code: '340322'
          },
          {
            label: '固镇县',
            code: '340323'
          }
        ]
      },
      {
        label: '淮南市',
        code: '340400',
        children: [
          {
            label: '大通区',
            code: '340402'
          },
          {
            label: '田家庵区',
            code: '340403'
          },
          {
            label: '谢家集区',
            code: '340404'
          },
          {
            label: '八公山区',
            code: '340405'
          },
          {
            label: '潘集区',
            code: '340406'
          },
          {
            label: '凤台县',
            code: '340421'
          }
        ]
      },
      {
        label: '马鞍山市',
        code: '340500',
        children: [
          {
            label: '花山区',
            code: '340503'
          },
          {
            label: '雨山区',
            code: '340504'
          },
          {
            label: '博望区',
            code: '340506'
          },
          {
            label: '当涂县',
            code: '340521'
          },
          {
            label: '含山县',
            code: '340522'
          },
          {
            label: '和县',
            code: '340523'
          }
        ]
      },
      {
        label: '淮北市',
        code: '340600',
        children: [
          {
            label: '杜集区',
            code: '340602'
          },
          {
            label: '相山区',
            code: '340603'
          },
          {
            label: '烈山区',
            code: '340604'
          },
          {
            label: '濉溪县',
            code: '340621'
          }
        ]
      },
      {
        label: '铜陵市',
        code: '340700',
        children: [
          {
            label: '铜官山区',
            code: '340702'
          },
          {
            label: '狮子山区',
            code: '340703'
          },
          {
            label: '郊区',
            code: '340711'
          },
          {
            label: '铜陵县',
            code: '340721'
          }
        ]
      },
      {
        label: '安庆市',
        code: '340800',
        children: [
          {
            label: '迎江区',
            code: '340802'
          },
          {
            label: '大观区',
            code: '340803'
          },
          {
            label: '宜秀区',
            code: '340811'
          },
          {
            label: '怀宁县',
            code: '340822'
          },
          {
            label: '枞阳县',
            code: '340823'
          },
          {
            label: '潜山县',
            code: '340824'
          },
          {
            label: '太湖县',
            code: '340825'
          },
          {
            label: '宿松县',
            code: '340826'
          },
          {
            label: '望江县',
            code: '340827'
          },
          {
            label: '岳西县',
            code: '340828'
          },
          {
            label: '桐城市',
            code: '340881'
          }
        ]
      },
      {
        label: '黄山市',
        code: '341000',
        children: [
          {
            label: '屯溪区',
            code: '341002'
          },
          {
            label: '黄山区',
            code: '341003'
          },
          {
            label: '徽州区',
            code: '341004'
          },
          {
            label: '歙县',
            code: '341021'
          },
          {
            label: '休宁县',
            code: '341022'
          },
          {
            label: '黟县',
            code: '341023'
          },
          {
            label: '祁门县',
            code: '341024'
          }
        ]
      },
      {
        label: '滁州市',
        code: '341100',
        children: [
          {
            label: '琅琊区',
            code: '341102'
          },
          {
            label: '南谯区',
            code: '341103'
          },
          {
            label: '来安县',
            code: '341122'
          },
          {
            label: '全椒县',
            code: '341124'
          },
          {
            label: '定远县',
            code: '341125'
          },
          {
            label: '凤阳县',
            code: '341126'
          },
          {
            label: '天长市',
            code: '341181'
          },
          {
            label: '明光市',
            code: '341182'
          }
        ]
      },
      {
        label: '阜阳市',
        code: '341200',
        children: [
          {
            label: '颍州区',
            code: '341202'
          },
          {
            label: '颍东区',
            code: '341203'
          },
          {
            label: '颍泉区',
            code: '341204'
          },
          {
            label: '临泉县',
            code: '341221'
          },
          {
            label: '太和县',
            code: '341222'
          },
          {
            label: '阜南县',
            code: '341225'
          },
          {
            label: '颍上县',
            code: '341226'
          },
          {
            label: '界首市',
            code: '341282'
          }
        ]
      },
      {
        label: '宿州市',
        code: '341300',
        children: [
          {
            label: '埇桥区',
            code: '341302'
          },
          {
            label: '砀山县',
            code: '341321'
          },
          {
            label: '萧县',
            code: '341322'
          },
          {
            label: '灵璧县',
            code: '341323'
          },
          {
            label: '泗县',
            code: '341324'
          }
        ]
      },
      {
        label: '六安市',
        code: '341500',
        children: [
          {
            label: '金安区',
            code: '341502'
          },
          {
            label: '裕安区',
            code: '341503'
          },
          {
            label: '寿县',
            code: '341521'
          },
          {
            label: '霍邱县',
            code: '341522'
          },
          {
            label: '舒城县',
            code: '341523'
          },
          {
            label: '金寨县',
            code: '341524'
          },
          {
            label: '霍山县',
            code: '341525'
          }
        ]
      },
      {
        label: '亳州市',
        code: '341600',
        children: [
          {
            label: '谯城区',
            code: '341602'
          },
          {
            label: '涡阳县',
            code: '341621'
          },
          {
            label: '蒙城县',
            code: '341622'
          },
          {
            label: '利辛县',
            code: '341623'
          }
        ]
      },
      {
        label: '池州市',
        code: '341700',
        children: [
          {
            label: '贵池区',
            code: '341702'
          },
          {
            label: '东至县',
            code: '341721'
          },
          {
            label: '石台县',
            code: '341722'
          },
          {
            label: '青阳县',
            code: '341723'
          }
        ]
      },
      {
        label: '宣城市',
        code: '341800',
        children: [
          {
            label: '宣州区',
            code: '341802'
          },
          {
            label: '郎溪县',
            code: '341821'
          },
          {
            label: '广德县',
            code: '341822'
          },
          {
            label: '泾县',
            code: '341823'
          },
          {
            label: '绩溪县',
            code: '341824'
          },
          {
            label: '旌德县',
            code: '341825'
          },
          {
            label: '宁国市',
            code: '341881'
          }
        ]
      }
    ]
  },
  {
    label: '福建省',
    code: '350000',
    children: [
      {
        label: '福州市',
        code: '350100',
        children: [
          {
            label: '鼓楼区',
            code: '350102'
          },
          {
            label: '台江区',
            code: '350103'
          },
          {
            label: '仓山区',
            code: '350104'
          },
          {
            label: '马尾区',
            code: '350105'
          },
          {
            label: '晋安区',
            code: '350111'
          },
          {
            label: '闽侯县',
            code: '350121'
          },
          {
            label: '连江县',
            code: '350122'
          },
          {
            label: '罗源县',
            code: '350123'
          },
          {
            label: '闽清县',
            code: '350124'
          },
          {
            label: '永泰县',
            code: '350125'
          },
          {
            label: '平潭县',
            code: '350128'
          },
          {
            label: '福清市',
            code: '350181'
          },
          {
            label: '长乐市',
            code: '350182'
          }
        ]
      },
      {
        label: '厦门市',
        code: '350200',
        children: [
          {
            label: '思明区',
            code: '350203'
          },
          {
            label: '海沧区',
            code: '350205'
          },
          {
            label: '湖里区',
            code: '350206'
          },
          {
            label: '集美区',
            code: '350211'
          },
          {
            label: '同安区',
            code: '350212'
          },
          {
            label: '翔安区',
            code: '350213'
          }
        ]
      },
      {
        label: '莆田市',
        code: '350300',
        children: [
          {
            label: '城厢区',
            code: '350302'
          },
          {
            label: '涵江区',
            code: '350303'
          },
          {
            label: '荔城区',
            code: '350304'
          },
          {
            label: '秀屿区',
            code: '350305'
          },
          {
            label: '仙游县',
            code: '350322'
          }
        ]
      },
      {
        label: '三明市',
        code: '350400',
        children: [
          {
            label: '梅列区',
            code: '350402'
          },
          {
            label: '三元区',
            code: '350403'
          },
          {
            label: '明溪县',
            code: '350421'
          },
          {
            label: '清流县',
            code: '350423'
          },
          {
            label: '宁化县',
            code: '350424'
          },
          {
            label: '大田县',
            code: '350425'
          },
          {
            label: '尤溪县',
            code: '350426'
          },
          {
            label: '沙县',
            code: '350427'
          },
          {
            label: '将乐县',
            code: '350428'
          },
          {
            label: '泰宁县',
            code: '350429'
          },
          {
            label: '建宁县',
            code: '350430'
          },
          {
            label: '永安市',
            code: '350481'
          }
        ]
      },
      {
        label: '泉州市',
        code: '350500',
        children: [
          {
            label: '鲤城区',
            code: '350502'
          },
          {
            label: '丰泽区',
            code: '350503'
          },
          {
            label: '洛江区',
            code: '350504'
          },
          {
            label: '泉港区',
            code: '350505'
          },
          {
            label: '惠安县',
            code: '350521'
          },
          {
            label: '安溪县',
            code: '350524'
          },
          {
            label: '永春县',
            code: '350525'
          },
          {
            label: '德化县',
            code: '350526'
          },
          {
            label: '金门县',
            code: '350527'
          },
          {
            label: '石狮市',
            code: '350581'
          },
          {
            label: '晋江市',
            code: '350582'
          },
          {
            label: '南安市',
            code: '350583'
          }
        ]
      },
      {
        label: '漳州市',
        code: '350600',
        children: [
          {
            label: '芗城区',
            code: '350602'
          },
          {
            label: '龙文区',
            code: '350603'
          },
          {
            label: '云霄县',
            code: '350622'
          },
          {
            label: '漳浦县',
            code: '350623'
          },
          {
            label: '诏安县',
            code: '350624'
          },
          {
            label: '长泰县',
            code: '350625'
          },
          {
            label: '东山县',
            code: '350626'
          },
          {
            label: '南靖县',
            code: '350627'
          },
          {
            label: '平和县',
            code: '350628'
          },
          {
            label: '华安县',
            code: '350629'
          },
          {
            label: '龙海市',
            code: '350681'
          }
        ]
      },
      {
        label: '南平市',
        code: '350700',
        children: [
          {
            label: '延平区',
            code: '350702'
          },
          {
            label: '建阳区',
            code: '350703'
          },
          {
            label: '顺昌县',
            code: '350721'
          },
          {
            label: '浦城县',
            code: '350722'
          },
          {
            label: '光泽县',
            code: '350723'
          },
          {
            label: '松溪县',
            code: '350724'
          },
          {
            label: '政和县',
            code: '350725'
          },
          {
            label: '邵武市',
            code: '350781'
          },
          {
            label: '武夷山市',
            code: '350782'
          },
          {
            label: '建瓯市',
            code: '350783'
          }
        ]
      },
      {
        label: '龙岩市',
        code: '350800',
        children: [
          {
            label: '新罗区',
            code: '350802'
          },
          {
            label: '长汀县',
            code: '350821'
          },
          {
            label: '永定区',
            code: '350822'
          },
          {
            label: '上杭县',
            code: '350823'
          },
          {
            label: '武平县',
            code: '350824'
          },
          {
            label: '连城县',
            code: '350825'
          },
          {
            label: '漳平市',
            code: '350881'
          }
        ]
      },
      {
        label: '宁德市',
        code: '350900',
        children: [
          {
            label: '蕉城区',
            code: '350902'
          },
          {
            label: '霞浦县',
            code: '350921'
          },
          {
            label: '古田县',
            code: '350922'
          },
          {
            label: '屏南县',
            code: '350923'
          },
          {
            label: '寿宁县',
            code: '350924'
          },
          {
            label: '周宁县',
            code: '350925'
          },
          {
            label: '柘荣县',
            code: '350926'
          },
          {
            label: '福安市',
            code: '350981'
          },
          {
            label: '福鼎市',
            code: '350982'
          }
        ]
      }
    ]
  },
  {
    label: '江西省',
    code: '360000',
    children: [
      {
        label: '南昌市',
        code: '360100',
        children: [
          {
            label: '东湖区',
            code: '360102'
          },
          {
            label: '西湖区',
            code: '360103'
          },
          {
            label: '青云谱区',
            code: '360104'
          },
          {
            label: '湾里区',
            code: '360105'
          },
          {
            label: '青山湖区',
            code: '360111'
          },
          {
            label: '南昌县',
            code: '360121'
          },
          {
            label: '新建县',
            code: '360122'
          },
          {
            label: '安义县',
            code: '360123'
          },
          {
            label: '进贤县',
            code: '360124'
          }
        ]
      },
      {
        label: '景德镇市',
        code: '360200',
        children: [
          {
            label: '昌江区',
            code: '360202'
          },
          {
            label: '珠山区',
            code: '360203'
          },
          {
            label: '浮梁县',
            code: '360222'
          },
          {
            label: '乐平市',
            code: '360281'
          }
        ]
      },
      {
        label: '萍乡市',
        code: '360300',
        children: [
          {
            label: '安源区',
            code: '360302'
          },
          {
            label: '湘东区',
            code: '360313'
          },
          {
            label: '莲花县',
            code: '360321'
          },
          {
            label: '上栗县',
            code: '360322'
          },
          {
            label: '芦溪县',
            code: '360323'
          }
        ]
      },
      {
        label: '九江市',
        code: '360400',
        children: [
          {
            label: '庐山区',
            code: '360402'
          },
          {
            label: '浔阳区',
            code: '360403'
          },
          {
            label: '九江县',
            code: '360421'
          },
          {
            label: '武宁县',
            code: '360423'
          },
          {
            label: '修水县',
            code: '360424'
          },
          {
            label: '永修县',
            code: '360425'
          },
          {
            label: '德安县',
            code: '360426'
          },
          {
            label: '星子县',
            code: '360427'
          },
          {
            label: '都昌县',
            code: '360428'
          },
          {
            label: '湖口县',
            code: '360429'
          },
          {
            label: '彭泽县',
            code: '360430'
          },
          {
            label: '瑞昌市',
            code: '360481'
          },
          {
            label: '共青城市',
            code: '360482'
          }
        ]
      },
      {
        label: '新余市',
        code: '360500',
        children: [
          {
            label: '渝水区',
            code: '360502'
          },
          {
            label: '分宜县',
            code: '360521'
          }
        ]
      },
      {
        label: '鹰潭市',
        code: '360600',
        children: [
          {
            label: '月湖区',
            code: '360602'
          },
          {
            label: '余江县',
            code: '360622'
          },
          {
            label: '贵溪市',
            code: '360681'
          }
        ]
      },
      {
        label: '赣州市',
        code: '360700',
        children: [
          {
            label: '章贡区',
            code: '360702'
          },
          {
            label: '南康区',
            code: '360703'
          },
          {
            label: '赣县',
            code: '360721'
          },
          {
            label: '信丰县',
            code: '360722'
          },
          {
            label: '大余县',
            code: '360723'
          },
          {
            label: '上犹县',
            code: '360724'
          },
          {
            label: '崇义县',
            code: '360725'
          },
          {
            label: '安远县',
            code: '360726'
          },
          {
            label: '龙南县',
            code: '360727'
          },
          {
            label: '定南县',
            code: '360728'
          },
          {
            label: '全南县',
            code: '360729'
          },
          {
            label: '宁都县',
            code: '360730'
          },
          {
            label: '于都县',
            code: '360731'
          },
          {
            label: '兴国县',
            code: '360732'
          },
          {
            label: '会昌县',
            code: '360733'
          },
          {
            label: '寻乌县',
            code: '360734'
          },
          {
            label: '石城县',
            code: '360735'
          },
          {
            label: '瑞金市',
            code: '360781'
          }
        ]
      },
      {
        label: '吉安市',
        code: '360800',
        children: [
          {
            label: '吉州区',
            code: '360802'
          },
          {
            label: '青原区',
            code: '360803'
          },
          {
            label: '吉安县',
            code: '360821'
          },
          {
            label: '吉水县',
            code: '360822'
          },
          {
            label: '峡江县',
            code: '360823'
          },
          {
            label: '新干县',
            code: '360824'
          },
          {
            label: '永丰县',
            code: '360825'
          },
          {
            label: '泰和县',
            code: '360826'
          },
          {
            label: '遂川县',
            code: '360827'
          },
          {
            label: '万安县',
            code: '360828'
          },
          {
            label: '安福县',
            code: '360829'
          },
          {
            label: '永新县',
            code: '360830'
          },
          {
            label: '井冈山市',
            code: '360881'
          }
        ]
      },
      {
        label: '宜春市',
        code: '360900',
        children: [
          {
            label: '袁州区',
            code: '360902'
          },
          {
            label: '奉新县',
            code: '360921'
          },
          {
            label: '万载县',
            code: '360922'
          },
          {
            label: '上高县',
            code: '360923'
          },
          {
            label: '宜丰县',
            code: '360924'
          },
          {
            label: '靖安县',
            code: '360925'
          },
          {
            label: '铜鼓县',
            code: '360926'
          },
          {
            label: '丰城市',
            code: '360981'
          },
          {
            label: '樟树市',
            code: '360982'
          },
          {
            label: '高安市',
            code: '360983'
          }
        ]
      },
      {
        label: '抚州市',
        code: '361000',
        children: [
          {
            label: '临川区',
            code: '361002'
          },
          {
            label: '南城县',
            code: '361021'
          },
          {
            label: '黎川县',
            code: '361022'
          },
          {
            label: '南丰县',
            code: '361023'
          },
          {
            label: '崇仁县',
            code: '361024'
          },
          {
            label: '乐安县',
            code: '361025'
          },
          {
            label: '宜黄县',
            code: '361026'
          },
          {
            label: '金溪县',
            code: '361027'
          },
          {
            label: '资溪县',
            code: '361028'
          },
          {
            label: '东乡县',
            code: '361029'
          },
          {
            label: '广昌县',
            code: '361030'
          }
        ]
      },
      {
        label: '上饶市',
        code: '361100',
        children: [
          {
            label: '信州区',
            code: '361102'
          },
          {
            label: '上饶县',
            code: '361121'
          },
          {
            label: '广丰县',
            code: '361122'
          },
          {
            label: '玉山县',
            code: '361123'
          },
          {
            label: '铅山县',
            code: '361124'
          },
          {
            label: '横峰县',
            code: '361125'
          },
          {
            label: '弋阳县',
            code: '361126'
          },
          {
            label: '余干县',
            code: '361127'
          },
          {
            label: '鄱阳县',
            code: '361128'
          },
          {
            label: '万年县',
            code: '361129'
          },
          {
            label: '婺源县',
            code: '361130'
          },
          {
            label: '德兴市',
            code: '361181'
          }
        ]
      }
    ]
  },
  {
    label: '山东省',
    code: '370000',
    children: [
      {
        label: '济南市',
        code: '370100',
        children: [
          {
            label: '历下区',
            code: '370102'
          },
          {
            label: '市中区',
            code: '370103'
          },
          {
            label: '槐荫区',
            code: '370104'
          },
          {
            label: '天桥区',
            code: '370105'
          },
          {
            label: '历城区',
            code: '370112'
          },
          {
            label: '长清区',
            code: '370113'
          },
          {
            label: '平阴县',
            code: '370124'
          },
          {
            label: '济阳县',
            code: '370125'
          },
          {
            label: '商河县',
            code: '370126'
          },
          {
            label: '章丘市',
            code: '370181'
          }
        ]
      },
      {
        label: '青岛市',
        code: '370200',
        children: [
          {
            label: '市南区',
            code: '370202'
          },
          {
            label: '市北区',
            code: '370203'
          },
          {
            label: '黄岛区',
            code: '370211'
          },
          {
            label: '崂山区',
            code: '370212'
          },
          {
            label: '李沧区',
            code: '370213'
          },
          {
            label: '城阳区',
            code: '370214'
          },
          {
            label: '胶州市',
            code: '370281'
          },
          {
            label: '即墨市',
            code: '370282'
          },
          {
            label: '平度市',
            code: '370283'
          },
          {
            label: '莱西市',
            code: '370285'
          },
          {
            label: '西海岸新区',
            code: '370286'
          }
        ]
      },
      {
        label: '淄博市',
        code: '370300',
        children: [
          {
            label: '淄川区',
            code: '370302'
          },
          {
            label: '张店区',
            code: '370303'
          },
          {
            label: '博山区',
            code: '370304'
          },
          {
            label: '临淄区',
            code: '370305'
          },
          {
            label: '周村区',
            code: '370306'
          },
          {
            label: '桓台县',
            code: '370321'
          },
          {
            label: '高青县',
            code: '370322'
          },
          {
            label: '沂源县',
            code: '370323'
          }
        ]
      },
      {
        label: '枣庄市',
        code: '370400',
        children: [
          {
            label: '市中区',
            code: '370402'
          },
          {
            label: '薛城区',
            code: '370403'
          },
          {
            label: '峄城区',
            code: '370404'
          },
          {
            label: '台儿庄区',
            code: '370405'
          },
          {
            label: '山亭区',
            code: '370406'
          },
          {
            label: '滕州市',
            code: '370481'
          }
        ]
      },
      {
        label: '东营市',
        code: '370500',
        children: [
          {
            label: '东营区',
            code: '370502'
          },
          {
            label: '河口区',
            code: '370503'
          },
          {
            label: '垦利县',
            code: '370521'
          },
          {
            label: '利津县',
            code: '370522'
          },
          {
            label: '广饶县',
            code: '370523'
          }
        ]
      },
      {
        label: '烟台市',
        code: '370600',
        children: [
          {
            label: '芝罘区',
            code: '370602'
          },
          {
            label: '福山区',
            code: '370611'
          },
          {
            label: '牟平区',
            code: '370612'
          },
          {
            label: '莱山区',
            code: '370613'
          },
          {
            label: '长岛县',
            code: '370634'
          },
          {
            label: '龙口市',
            code: '370681'
          },
          {
            label: '莱阳市',
            code: '370682'
          },
          {
            label: '莱州市',
            code: '370683'
          },
          {
            label: '蓬莱市',
            code: '370684'
          },
          {
            label: '招远市',
            code: '370685'
          },
          {
            label: '栖霞市',
            code: '370686'
          },
          {
            label: '海阳市',
            code: '370687'
          }
        ]
      },
      {
        label: '潍坊市',
        code: '370700',
        children: [
          {
            label: '潍城区',
            code: '370702'
          },
          {
            label: '寒亭区',
            code: '370703'
          },
          {
            label: '坊子区',
            code: '370704'
          },
          {
            label: '奎文区',
            code: '370705'
          },
          {
            label: '临朐县',
            code: '370724'
          },
          {
            label: '昌乐县',
            code: '370725'
          },
          {
            label: '青州市',
            code: '370781'
          },
          {
            label: '诸城市',
            code: '370782'
          },
          {
            label: '寿光市',
            code: '370783'
          },
          {
            label: '安丘市',
            code: '370784'
          },
          {
            label: '高密市',
            code: '370785'
          },
          {
            label: '昌邑市',
            code: '370786'
          }
        ]
      },
      {
        label: '济宁市',
        code: '370800',
        children: [
          {
            label: '任城区',
            code: '370811'
          },
          {
            label: '兖州区',
            code: '370812'
          },
          {
            label: '微山县',
            code: '370826'
          },
          {
            label: '鱼台县',
            code: '370827'
          },
          {
            label: '金乡县',
            code: '370828'
          },
          {
            label: '嘉祥县',
            code: '370829'
          },
          {
            label: '汶上县',
            code: '370830'
          },
          {
            label: '泗水县',
            code: '370831'
          },
          {
            label: '梁山县',
            code: '370832'
          },
          {
            label: '曲阜市',
            code: '370881'
          },
          {
            label: '邹城市',
            code: '370883'
          }
        ]
      },
      {
        label: '泰安市',
        code: '370900',
        children: [
          {
            label: '泰山区',
            code: '370902'
          },
          {
            label: '岱岳区',
            code: '370911'
          },
          {
            label: '宁阳县',
            code: '370921'
          },
          {
            label: '东平县',
            code: '370923'
          },
          {
            label: '新泰市',
            code: '370982'
          },
          {
            label: '肥城市',
            code: '370983'
          }
        ]
      },
      {
        label: '威海市',
        code: '371000',
        children: [
          {
            label: '环翠区',
            code: '371002'
          },
          {
            label: '文登区',
            code: '371003'
          },
          {
            label: '荣成市',
            code: '371082'
          },
          {
            label: '乳山市',
            code: '371083'
          }
        ]
      },
      {
        label: '日照市',
        code: '371100',
        children: [
          {
            label: '东港区',
            code: '371102'
          },
          {
            label: '岚山区',
            code: '371103'
          },
          {
            label: '五莲县',
            code: '371121'
          },
          {
            label: '莒县',
            code: '371122'
          }
        ]
      },
      {
        label: '莱芜市',
        code: '371200',
        children: [
          {
            label: '莱城区',
            code: '371202'
          },
          {
            label: '钢城区',
            code: '371203'
          }
        ]
      },
      {
        label: '临沂市',
        code: '371300',
        children: [
          {
            label: '兰山区',
            code: '371302'
          },
          {
            label: '罗庄区',
            code: '371311'
          },
          {
            label: '河东区',
            code: '371312'
          },
          {
            label: '沂南县',
            code: '371321'
          },
          {
            label: '郯城县',
            code: '371322'
          },
          {
            label: '沂水县',
            code: '371323'
          },
          {
            label: '兰陵县',
            code: '371324'
          },
          {
            label: '费县',
            code: '371325'
          },
          {
            label: '平邑县',
            code: '371326'
          },
          {
            label: '莒南县',
            code: '371327'
          },
          {
            label: '蒙阴县',
            code: '371328'
          },
          {
            label: '临沭县',
            code: '371329'
          }
        ]
      },
      {
        label: '德州市',
        code: '371400',
        children: [
          {
            label: '德城区',
            code: '371402'
          },
          {
            label: '陵城区',
            code: '371403'
          },
          {
            label: '宁津县',
            code: '371422'
          },
          {
            label: '庆云县',
            code: '371423'
          },
          {
            label: '临邑县',
            code: '371424'
          },
          {
            label: '齐河县',
            code: '371425'
          },
          {
            label: '平原县',
            code: '371426'
          },
          {
            label: '夏津县',
            code: '371427'
          },
          {
            label: '武城县',
            code: '371428'
          },
          {
            label: '乐陵市',
            code: '371481'
          },
          {
            label: '禹城市',
            code: '371482'
          }
        ]
      },
      {
        label: '聊城市',
        code: '371500',
        children: [
          {
            label: '东昌府区',
            code: '371502'
          },
          {
            label: '阳谷县',
            code: '371521'
          },
          {
            label: '莘县',
            code: '371522'
          },
          {
            label: '茌平县',
            code: '371523'
          },
          {
            label: '东阿县',
            code: '371524'
          },
          {
            label: '冠县',
            code: '371525'
          },
          {
            label: '高唐县',
            code: '371526'
          },
          {
            label: '临清市',
            code: '371581'
          }
        ]
      },
      {
        label: '滨州市',
        code: '371600',
        children: [
          {
            label: '滨城区',
            code: '371602'
          },
          {
            label: '沾化区',
            code: '371603'
          },
          {
            label: '惠民县',
            code: '371621'
          },
          {
            label: '阳信县',
            code: '371622'
          },
          {
            label: '无棣县',
            code: '371623'
          },
          {
            label: '博兴县',
            code: '371625'
          },
          {
            label: '邹平县',
            code: '371626'
          },
          {
            label: '北海新区',
            code: '371627'
          }
        ]
      },
      {
        label: '菏泽市',
        code: '371700',
        children: [
          {
            label: '牡丹区',
            code: '371702'
          },
          {
            label: '曹县',
            code: '371721'
          },
          {
            label: '单县',
            code: '371722'
          },
          {
            label: '成武县',
            code: '371723'
          },
          {
            label: '巨野县',
            code: '371724'
          },
          {
            label: '郓城县',
            code: '371725'
          },
          {
            label: '鄄城县',
            code: '371726'
          },
          {
            label: '定陶县',
            code: '371727'
          },
          {
            label: '东明县',
            code: '371728'
          }
        ]
      }
    ]
  },
  {
    label: '河南省',
    code: '410000',
    children: [
      {
        label: '郑州市',
        code: '410100',
        children: [
          {
            label: '中原区',
            code: '410102'
          },
          {
            label: '二七区',
            code: '410103'
          },
          {
            label: '管城回族区',
            code: '410104'
          },
          {
            label: '金水区',
            code: '410105'
          },
          {
            label: '上街区',
            code: '410106'
          },
          {
            label: '惠济区',
            code: '410108'
          },
          {
            label: '中牟县',
            code: '410122'
          },
          {
            label: '巩义市',
            code: '410181'
          },
          {
            label: '荥阳市',
            code: '410182'
          },
          {
            label: '新密市',
            code: '410183'
          },
          {
            label: '新郑市',
            code: '410184'
          },
          {
            label: '登封市',
            code: '410185'
          }
        ]
      },
      {
        label: '开封市',
        code: '410200',
        children: [
          {
            label: '龙亭区',
            code: '410202'
          },
          {
            label: '顺河回族区',
            code: '410203'
          },
          {
            label: '鼓楼区',
            code: '410204'
          },
          {
            label: '禹王台区',
            code: '410205'
          },
          {
            label: '祥符区',
            code: '410212'
          },
          {
            label: '杞县',
            code: '410221'
          },
          {
            label: '通许县',
            code: '410222'
          },
          {
            label: '尉氏县',
            code: '410223'
          },
          {
            label: '兰考县',
            code: '410225'
          }
        ]
      },
      {
        label: '洛阳市',
        code: '410300',
        children: [
          {
            label: '老城区',
            code: '410302'
          },
          {
            label: '西工区',
            code: '410303'
          },
          {
            label: '瀍河回族区',
            code: '410304'
          },
          {
            label: '涧西区',
            code: '410305'
          },
          {
            label: '吉利区',
            code: '410306'
          },
          {
            label: '洛龙区',
            code: '410311'
          },
          {
            label: '孟津县',
            code: '410322'
          },
          {
            label: '新安县',
            code: '410323'
          },
          {
            label: '栾川县',
            code: '410324'
          },
          {
            label: '嵩县',
            code: '410325'
          },
          {
            label: '汝阳县',
            code: '410326'
          },
          {
            label: '宜阳县',
            code: '410327'
          },
          {
            label: '洛宁县',
            code: '410328'
          },
          {
            label: '伊川县',
            code: '410329'
          },
          {
            label: '偃师市',
            code: '410381'
          }
        ]
      },
      {
        label: '平顶山市',
        code: '410400',
        children: [
          {
            label: '新华区',
            code: '410402'
          },
          {
            label: '卫东区',
            code: '410403'
          },
          {
            label: '石龙区',
            code: '410404'
          },
          {
            label: '湛河区',
            code: '410411'
          },
          {
            label: '宝丰县',
            code: '410421'
          },
          {
            label: '叶县',
            code: '410422'
          },
          {
            label: '鲁山县',
            code: '410423'
          },
          {
            label: '郏县',
            code: '410425'
          },
          {
            label: '舞钢市',
            code: '410481'
          },
          {
            label: '汝州市',
            code: '410482'
          }
        ]
      },
      {
        label: '安阳市',
        code: '410500',
        children: [
          {
            label: '文峰区',
            code: '410502'
          },
          {
            label: '北关区',
            code: '410503'
          },
          {
            label: '殷都区',
            code: '410505'
          },
          {
            label: '龙安区',
            code: '410506'
          },
          {
            label: '安阳县',
            code: '410522'
          },
          {
            label: '汤阴县',
            code: '410523'
          },
          {
            label: '滑县',
            code: '410526'
          },
          {
            label: '内黄县',
            code: '410527'
          },
          {
            label: '林州市',
            code: '410581'
          }
        ]
      },
      {
        label: '鹤壁市',
        code: '410600',
        children: [
          {
            label: '鹤山区',
            code: '410602'
          },
          {
            label: '山城区',
            code: '410603'
          },
          {
            label: '淇滨区',
            code: '410611'
          },
          {
            label: '浚县',
            code: '410621'
          },
          {
            label: '淇县',
            code: '410622'
          }
        ]
      },
      {
        label: '新乡市',
        code: '410700',
        children: [
          {
            label: '红旗区',
            code: '410702'
          },
          {
            label: '卫滨区',
            code: '410703'
          },
          {
            label: '凤泉区',
            code: '410704'
          },
          {
            label: '牧野区',
            code: '410711'
          },
          {
            label: '新乡县',
            code: '410721'
          },
          {
            label: '获嘉县',
            code: '410724'
          },
          {
            label: '原阳县',
            code: '410725'
          },
          {
            label: '延津县',
            code: '410726'
          },
          {
            label: '封丘县',
            code: '410727'
          },
          {
            label: '长垣县',
            code: '410728'
          },
          {
            label: '卫辉市',
            code: '410781'
          },
          {
            label: '辉县市',
            code: '410782'
          }
        ]
      },
      {
        label: '焦作市',
        code: '410800',
        children: [
          {
            label: '解放区',
            code: '410802'
          },
          {
            label: '中站区',
            code: '410803'
          },
          {
            label: '马村区',
            code: '410804'
          },
          {
            label: '山阳区',
            code: '410811'
          },
          {
            label: '修武县',
            code: '410821'
          },
          {
            label: '博爱县',
            code: '410822'
          },
          {
            label: '武陟县',
            code: '410823'
          },
          {
            label: '温县',
            code: '410825'
          },
          {
            label: '沁阳市',
            code: '410882'
          },
          {
            label: '孟州市',
            code: '410883'
          }
        ]
      },
      {
        label: '濮阳市',
        code: '410900',
        children: [
          {
            label: '华龙区',
            code: '410902'
          },
          {
            label: '清丰县',
            code: '410922'
          },
          {
            label: '南乐县',
            code: '410923'
          },
          {
            label: '范县',
            code: '410926'
          },
          {
            label: '台前县',
            code: '410927'
          },
          {
            label: '濮阳县',
            code: '410928'
          }
        ]
      },
      {
        label: '许昌市',
        code: '411000',
        children: [
          {
            label: '魏都区',
            code: '411002'
          },
          {
            label: '许昌县',
            code: '411023'
          },
          {
            label: '鄢陵县',
            code: '411024'
          },
          {
            label: '襄城县',
            code: '411025'
          },
          {
            label: '禹州市',
            code: '411081'
          },
          {
            label: '长葛市',
            code: '411082'
          }
        ]
      },
      {
        label: '漯河市',
        code: '411100',
        children: [
          {
            label: '源汇区',
            code: '411102'
          },
          {
            label: '郾城区',
            code: '411103'
          },
          {
            label: '召陵区',
            code: '411104'
          },
          {
            label: '舞阳县',
            code: '411121'
          },
          {
            label: '临颍县',
            code: '411122'
          }
        ]
      },
      {
        label: '三门峡市',
        code: '411200',
        children: [
          {
            label: '湖滨区',
            code: '411202'
          },
          {
            label: '渑池县',
            code: '411221'
          },
          {
            label: '陕县',
            code: '411222'
          },
          {
            label: '卢氏县',
            code: '411224'
          },
          {
            label: '义马市',
            code: '411281'
          },
          {
            label: '灵宝市',
            code: '411282'
          }
        ]
      },
      {
        label: '南阳市',
        code: '411300',
        children: [
          {
            label: '宛城区',
            code: '411302'
          },
          {
            label: '卧龙区',
            code: '411303'
          },
          {
            label: '南召县',
            code: '411321'
          },
          {
            label: '方城县',
            code: '411322'
          },
          {
            label: '西峡县',
            code: '411323'
          },
          {
            label: '镇平县',
            code: '411324'
          },
          {
            label: '内乡县',
            code: '411325'
          },
          {
            label: '淅川县',
            code: '411326'
          },
          {
            label: '社旗县',
            code: '411327'
          },
          {
            label: '唐河县',
            code: '411328'
          },
          {
            label: '新野县',
            code: '411329'
          },
          {
            label: '桐柏县',
            code: '411330'
          },
          {
            label: '邓州市',
            code: '411381'
          }
        ]
      },
      {
        label: '商丘市',
        code: '411400',
        children: [
          {
            label: '梁园区',
            code: '411402'
          },
          {
            label: '睢阳区',
            code: '411403'
          },
          {
            label: '民权县',
            code: '411421'
          },
          {
            label: '睢县',
            code: '411422'
          },
          {
            label: '宁陵县',
            code: '411423'
          },
          {
            label: '柘城县',
            code: '411424'
          },
          {
            label: '虞城县',
            code: '411425'
          },
          {
            label: '夏邑县',
            code: '411426'
          },
          {
            label: '永城市',
            code: '411481'
          }
        ]
      },
      {
        label: '信阳市',
        code: '411500',
        children: [
          {
            label: '浉河区',
            code: '411502'
          },
          {
            label: '平桥区',
            code: '411503'
          },
          {
            label: '罗山县',
            code: '411521'
          },
          {
            label: '光山县',
            code: '411522'
          },
          {
            label: '新县',
            code: '411523'
          },
          {
            label: '商城县',
            code: '411524'
          },
          {
            label: '固始县',
            code: '411525'
          },
          {
            label: '潢川县',
            code: '411526'
          },
          {
            label: '淮滨县',
            code: '411527'
          },
          {
            label: '息县',
            code: '411528'
          }
        ]
      },
      {
        label: '周口市',
        code: '411600',
        children: [
          {
            label: '川汇区',
            code: '411602'
          },
          {
            label: '扶沟县',
            code: '411621'
          },
          {
            label: '西华县',
            code: '411622'
          },
          {
            label: '商水县',
            code: '411623'
          },
          {
            label: '沈丘县',
            code: '411624'
          },
          {
            label: '郸城县',
            code: '411625'
          },
          {
            label: '淮阳县',
            code: '411626'
          },
          {
            label: '太康县',
            code: '411627'
          },
          {
            label: '鹿邑县',
            code: '411628'
          },
          {
            label: '项城市',
            code: '411681'
          }
        ]
      },
      {
        label: '驻马店市',
        code: '411700',
        children: [
          {
            label: '驿城区',
            code: '411702'
          },
          {
            label: '西平县',
            code: '411721'
          },
          {
            label: '上蔡县',
            code: '411722'
          },
          {
            label: '平舆县',
            code: '411723'
          },
          {
            label: '正阳县',
            code: '411724'
          },
          {
            label: '确山县',
            code: '411725'
          },
          {
            label: '泌阳县',
            code: '411726'
          },
          {
            label: '汝南县',
            code: '411727'
          },
          {
            label: '遂平县',
            code: '411728'
          },
          {
            label: '新蔡县',
            code: '411729'
          }
        ]
      },
      {
        label: '直辖县级',
        code: '419000',
        children: [
          {
            label: '济源市',
            code: '419001'
          }
        ]
      }
    ]
  },
  {
    label: '湖北省',
    code: '420000',
    children: [
      {
        label: '武汉市',
        code: '420100',
        children: [
          {
            label: '江岸区',
            code: '420102'
          },
          {
            label: '江汉区',
            code: '420103'
          },
          {
            label: '硚口区',
            code: '420104'
          },
          {
            label: '汉阳区',
            code: '420105'
          },
          {
            label: '武昌区',
            code: '420106'
          },
          {
            label: '青山区',
            code: '420107'
          },
          {
            label: '洪山区',
            code: '420111'
          },
          {
            label: '东西湖区',
            code: '420112'
          },
          {
            label: '汉南区',
            code: '420113'
          },
          {
            label: '蔡甸区',
            code: '420114'
          },
          {
            label: '江夏区',
            code: '420115'
          },
          {
            label: '黄陂区',
            code: '420116'
          },
          {
            label: '新洲区',
            code: '420117'
          }
        ]
      },
      {
        label: '黄石市',
        code: '420200',
        children: [
          {
            label: '黄石港区',
            code: '420202'
          },
          {
            label: '西塞山区',
            code: '420203'
          },
          {
            label: '下陆区',
            code: '420204'
          },
          {
            label: '铁山区',
            code: '420205'
          },
          {
            label: '阳新县',
            code: '420222'
          },
          {
            label: '大冶市',
            code: '420281'
          }
        ]
      },
      {
        label: '十堰市',
        code: '420300',
        children: [
          {
            label: '茅箭区',
            code: '420302'
          },
          {
            label: '张湾区',
            code: '420303'
          },
          {
            label: '郧阳区',
            code: '420304'
          },
          {
            label: '郧西县',
            code: '420322'
          },
          {
            label: '竹山县',
            code: '420323'
          },
          {
            label: '竹溪县',
            code: '420324'
          },
          {
            label: '房县',
            code: '420325'
          },
          {
            label: '丹江口市',
            code: '420381'
          }
        ]
      },
      {
        label: '宜昌市',
        code: '420500',
        children: [
          {
            label: '西陵区',
            code: '420502'
          },
          {
            label: '伍家岗区',
            code: '420503'
          },
          {
            label: '点军区',
            code: '420504'
          },
          {
            label: '猇亭区',
            code: '420505'
          },
          {
            label: '夷陵区',
            code: '420506'
          },
          {
            label: '远安县',
            code: '420525'
          },
          {
            label: '兴山县',
            code: '420526'
          },
          {
            label: '秭归县',
            code: '420527'
          },
          {
            label: '长阳土家族自治县',
            code: '420528'
          },
          {
            label: '五峰土家族自治县',
            code: '420529'
          },
          {
            label: '宜都市',
            code: '420581'
          },
          {
            label: '当阳市',
            code: '420582'
          },
          {
            label: '枝江市',
            code: '420583'
          }
        ]
      },
      {
        label: '襄阳市',
        code: '420600',
        children: [
          {
            label: '襄城区',
            code: '420602'
          },
          {
            label: '樊城区',
            code: '420606'
          },
          {
            label: '襄州区',
            code: '420607'
          },
          {
            label: '南漳县',
            code: '420624'
          },
          {
            label: '谷城县',
            code: '420625'
          },
          {
            label: '保康县',
            code: '420626'
          },
          {
            label: '老河口市',
            code: '420682'
          },
          {
            label: '枣阳市',
            code: '420683'
          },
          {
            label: '宜城市',
            code: '420684'
          }
        ]
      },
      {
        label: '鄂州市',
        code: '420700',
        children: [
          {
            label: '梁子湖区',
            code: '420702'
          },
          {
            label: '华容区',
            code: '420703'
          },
          {
            label: '鄂城区',
            code: '420704'
          }
        ]
      },
      {
        label: '荆门市',
        code: '420800',
        children: [
          {
            label: '东宝区',
            code: '420802'
          },
          {
            label: '掇刀区',
            code: '420804'
          },
          {
            label: '京山县',
            code: '420821'
          },
          {
            label: '沙洋县',
            code: '420822'
          },
          {
            label: '钟祥市',
            code: '420881'
          }
        ]
      },
      {
        label: '孝感市',
        code: '420900',
        children: [
          {
            label: '孝南区',
            code: '420902'
          },
          {
            label: '孝昌县',
            code: '420921'
          },
          {
            label: '大悟县',
            code: '420922'
          },
          {
            label: '云梦县',
            code: '420923'
          },
          {
            label: '应城市',
            code: '420981'
          },
          {
            label: '安陆市',
            code: '420982'
          },
          {
            label: '汉川市',
            code: '420984'
          }
        ]
      },
      {
        label: '荆州市',
        code: '421000',
        children: [
          {
            label: '沙市区',
            code: '421002'
          },
          {
            label: '荆州区',
            code: '421003'
          },
          {
            label: '公安县',
            code: '421022'
          },
          {
            label: '监利县',
            code: '421023'
          },
          {
            label: '江陵县',
            code: '421024'
          },
          {
            label: '石首市',
            code: '421081'
          },
          {
            label: '洪湖市',
            code: '421083'
          },
          {
            label: '松滋市',
            code: '421087'
          }
        ]
      },
      {
        label: '黄冈市',
        code: '421100',
        children: [
          {
            label: '黄州区',
            code: '421102'
          },
          {
            label: '团风县',
            code: '421121'
          },
          {
            label: '红安县',
            code: '421122'
          },
          {
            label: '罗田县',
            code: '421123'
          },
          {
            label: '英山县',
            code: '421124'
          },
          {
            label: '浠水县',
            code: '421125'
          },
          {
            label: '蕲春县',
            code: '421126'
          },
          {
            label: '黄梅县',
            code: '421127'
          },
          {
            label: '麻城市',
            code: '421181'
          },
          {
            label: '武穴市',
            code: '421182'
          }
        ]
      },
      {
        label: '咸宁市',
        code: '421200',
        children: [
          {
            label: '咸安区',
            code: '421202'
          },
          {
            label: '嘉鱼县',
            code: '421221'
          },
          {
            label: '通城县',
            code: '421222'
          },
          {
            label: '崇阳县',
            code: '421223'
          },
          {
            label: '通山县',
            code: '421224'
          },
          {
            label: '赤壁市',
            code: '421281'
          }
        ]
      },
      {
        label: '随州市',
        code: '421300',
        children: [
          {
            label: '曾都区',
            code: '421303'
          },
          {
            label: '随县',
            code: '421321'
          },
          {
            label: '广水市',
            code: '421381'
          }
        ]
      },
      {
        label: '恩施土家族苗族自治州',
        code: '422800',
        children: [
          {
            label: '恩施市',
            code: '422801'
          },
          {
            label: '利川市',
            code: '422802'
          },
          {
            label: '建始县',
            code: '422822'
          },
          {
            label: '巴东县',
            code: '422823'
          },
          {
            label: '宣恩县',
            code: '422825'
          },
          {
            label: '咸丰县',
            code: '422826'
          },
          {
            label: '来凤县',
            code: '422827'
          },
          {
            label: '鹤峰县',
            code: '422828'
          }
        ]
      },
      {
        label: '直辖县级',
        code: '429000',
        children: [
          {
            label: '仙桃市',
            code: '429004'
          },
          {
            label: '潜江市',
            code: '429005'
          },
          {
            label: '天门市',
            code: '429006'
          },
          {
            label: '神农架林区',
            code: '429021'
          }
        ]
      }
    ]
  },
  {
    label: '湖南省',
    code: '430000',
    children: [
      {
        label: '长沙市',
        code: '430100',
        children: [
          {
            label: '芙蓉区',
            code: '430102'
          },
          {
            label: '天心区',
            code: '430103'
          },
          {
            label: '岳麓区',
            code: '430104'
          },
          {
            label: '开福区',
            code: '430105'
          },
          {
            label: '雨花区',
            code: '430111'
          },
          {
            label: '望城区',
            code: '430112'
          },
          {
            label: '长沙县',
            code: '430121'
          },
          {
            label: '宁乡县',
            code: '430124'
          },
          {
            label: '浏阳市',
            code: '430181'
          }
        ]
      },
      {
        label: '株洲市',
        code: '430200',
        children: [
          {
            label: '荷塘区',
            code: '430202'
          },
          {
            label: '芦淞区',
            code: '430203'
          },
          {
            label: '石峰区',
            code: '430204'
          },
          {
            label: '天元区',
            code: '430211'
          },
          {
            label: '株洲县',
            code: '430221'
          },
          {
            label: '攸县',
            code: '430223'
          },
          {
            label: '茶陵县',
            code: '430224'
          },
          {
            label: '炎陵县',
            code: '430225'
          },
          {
            label: '醴陵市',
            code: '430281'
          }
        ]
      },
      {
        label: '湘潭市',
        code: '430300',
        children: [
          {
            label: '雨湖区',
            code: '430302'
          },
          {
            label: '岳塘区',
            code: '430304'
          },
          {
            label: '湘潭县',
            code: '430321'
          },
          {
            label: '湘乡市',
            code: '430381'
          },
          {
            label: '韶山市',
            code: '430382'
          }
        ]
      },
      {
        label: '衡阳市',
        code: '430400',
        children: [
          {
            label: '珠晖区',
            code: '430405'
          },
          {
            label: '雁峰区',
            code: '430406'
          },
          {
            label: '石鼓区',
            code: '430407'
          },
          {
            label: '蒸湘区',
            code: '430408'
          },
          {
            label: '南岳区',
            code: '430412'
          },
          {
            label: '衡阳县',
            code: '430421'
          },
          {
            label: '衡南县',
            code: '430422'
          },
          {
            label: '衡山县',
            code: '430423'
          },
          {
            label: '衡东县',
            code: '430424'
          },
          {
            label: '祁东县',
            code: '430426'
          },
          {
            label: '耒阳市',
            code: '430481'
          },
          {
            label: '常宁市',
            code: '430482'
          }
        ]
      },
      {
        label: '邵阳市',
        code: '430500',
        children: [
          {
            label: '双清区',
            code: '430502'
          },
          {
            label: '大祥区',
            code: '430503'
          },
          {
            label: '北塔区',
            code: '430511'
          },
          {
            label: '邵东县',
            code: '430521'
          },
          {
            label: '新邵县',
            code: '430522'
          },
          {
            label: '邵阳县',
            code: '430523'
          },
          {
            label: '隆回县',
            code: '430524'
          },
          {
            label: '洞口县',
            code: '430525'
          },
          {
            label: '绥宁县',
            code: '430527'
          },
          {
            label: '新宁县',
            code: '430528'
          },
          {
            label: '城步苗族自治县',
            code: '430529'
          },
          {
            label: '武冈市',
            code: '430581'
          }
        ]
      },
      {
        label: '岳阳市',
        code: '430600',
        children: [
          {
            label: '岳阳楼区',
            code: '430602'
          },
          {
            label: '云溪区',
            code: '430603'
          },
          {
            label: '君山区',
            code: '430611'
          },
          {
            label: '岳阳县',
            code: '430621'
          },
          {
            label: '华容县',
            code: '430623'
          },
          {
            label: '湘阴县',
            code: '430624'
          },
          {
            label: '平江县',
            code: '430626'
          },
          {
            label: '汨罗市',
            code: '430681'
          },
          {
            label: '临湘市',
            code: '430682'
          }
        ]
      },
      {
        label: '常德市',
        code: '430700',
        children: [
          {
            label: '武陵区',
            code: '430702'
          },
          {
            label: '鼎城区',
            code: '430703'
          },
          {
            label: '安乡县',
            code: '430721'
          },
          {
            label: '汉寿县',
            code: '430722'
          },
          {
            label: '澧县',
            code: '430723'
          },
          {
            label: '临澧县',
            code: '430724'
          },
          {
            label: '桃源县',
            code: '430725'
          },
          {
            label: '石门县',
            code: '430726'
          },
          {
            label: '津市市',
            code: '430781'
          }
        ]
      },
      {
        label: '张家界市',
        code: '430800',
        children: [
          {
            label: '永定区',
            code: '430802'
          },
          {
            label: '武陵源区',
            code: '430811'
          },
          {
            label: '慈利县',
            code: '430821'
          },
          {
            label: '桑植县',
            code: '430822'
          }
        ]
      },
      {
        label: '益阳市',
        code: '430900',
        children: [
          {
            label: '资阳区',
            code: '430902'
          },
          {
            label: '赫山区',
            code: '430903'
          },
          {
            label: '南县',
            code: '430921'
          },
          {
            label: '桃江县',
            code: '430922'
          },
          {
            label: '安化县',
            code: '430923'
          },
          {
            label: '沅江市',
            code: '430981'
          }
        ]
      },
      {
        label: '郴州市',
        code: '431000',
        children: [
          {
            label: '北湖区',
            code: '431002'
          },
          {
            label: '苏仙区',
            code: '431003'
          },
          {
            label: '桂阳县',
            code: '431021'
          },
          {
            label: '宜章县',
            code: '431022'
          },
          {
            label: '永兴县',
            code: '431023'
          },
          {
            label: '嘉禾县',
            code: '431024'
          },
          {
            label: '临武县',
            code: '431025'
          },
          {
            label: '汝城县',
            code: '431026'
          },
          {
            label: '桂东县',
            code: '431027'
          },
          {
            label: '安仁县',
            code: '431028'
          },
          {
            label: '资兴市',
            code: '431081'
          }
        ]
      },
      {
        label: '永州市',
        code: '431100',
        children: [
          {
            label: '零陵区',
            code: '431102'
          },
          {
            label: '冷水滩区',
            code: '431103'
          },
          {
            label: '祁阳县',
            code: '431121'
          },
          {
            label: '东安县',
            code: '431122'
          },
          {
            label: '双牌县',
            code: '431123'
          },
          {
            label: '道县',
            code: '431124'
          },
          {
            label: '江永县',
            code: '431125'
          },
          {
            label: '宁远县',
            code: '431126'
          },
          {
            label: '蓝山县',
            code: '431127'
          },
          {
            label: '新田县',
            code: '431128'
          },
          {
            label: '江华瑶族自治县',
            code: '431129'
          }
        ]
      },
      {
        label: '怀化市',
        code: '431200',
        children: [
          {
            label: '鹤城区',
            code: '431202'
          },
          {
            label: '中方县',
            code: '431221'
          },
          {
            label: '沅陵县',
            code: '431222'
          },
          {
            label: '辰溪县',
            code: '431223'
          },
          {
            label: '溆浦县',
            code: '431224'
          },
          {
            label: '会同县',
            code: '431225'
          },
          {
            label: '麻阳苗族自治县',
            code: '431226'
          },
          {
            label: '新晃侗族自治县',
            code: '431227'
          },
          {
            label: '芷江侗族自治县',
            code: '431228'
          },
          {
            label: '靖州苗族侗族自治县',
            code: '431229'
          },
          {
            label: '通道侗族自治县',
            code: '431230'
          },
          {
            label: '洪江市',
            code: '431281'
          }
        ]
      },
      {
        label: '娄底市',
        code: '431300',
        children: [
          {
            label: '娄星区',
            code: '431302'
          },
          {
            label: '双峰县',
            code: '431321'
          },
          {
            label: '新化县',
            code: '431322'
          },
          {
            label: '冷水江市',
            code: '431381'
          },
          {
            label: '涟源市',
            code: '431382'
          }
        ]
      },
      {
        label: '湘西土家族苗族自治州',
        code: '433100',
        children: [
          {
            label: '吉首市',
            code: '433101'
          },
          {
            label: '泸溪县',
            code: '433122'
          },
          {
            label: '凤凰县',
            code: '433123'
          },
          {
            label: '花垣县',
            code: '433124'
          },
          {
            label: '保靖县',
            code: '433125'
          },
          {
            label: '古丈县',
            code: '433126'
          },
          {
            label: '永顺县',
            code: '433127'
          },
          {
            label: '龙山县',
            code: '433130'
          }
        ]
      }
    ]
  },
  {
    label: '广东省',
    code: '440000',
    children: [
      {
        label: '广州市',
        code: '440100',
        children: [
          {
            label: '荔湾区',
            code: '440103'
          },
          {
            label: '越秀区',
            code: '440104'
          },
          {
            label: '海珠区',
            code: '440105'
          },
          {
            label: '天河区',
            code: '440106'
          },
          {
            label: '白云区',
            code: '440111'
          },
          {
            label: '黄埔区',
            code: '440112'
          },
          {
            label: '番禺区',
            code: '440113'
          },
          {
            label: '花都区',
            code: '440114'
          },
          {
            label: '南沙区',
            code: '440115'
          },
          {
            label: '从化区',
            code: '440117'
          },
          {
            label: '增城区',
            code: '440118'
          }
        ]
      },
      {
        label: '韶关市',
        code: '440200',
        children: [
          {
            label: '武江区',
            code: '440203'
          },
          {
            label: '浈江区',
            code: '440204'
          },
          {
            label: '曲江区',
            code: '440205'
          },
          {
            label: '始兴县',
            code: '440222'
          },
          {
            label: '仁化县',
            code: '440224'
          },
          {
            label: '翁源县',
            code: '440229'
          },
          {
            label: '乳源瑶族自治县',
            code: '440232'
          },
          {
            label: '新丰县',
            code: '440233'
          },
          {
            label: '乐昌市',
            code: '440281'
          },
          {
            label: '南雄市',
            code: '440282'
          }
        ]
      },
      {
        label: '深圳市',
        code: '440300',
        children: [
          {
            label: '罗湖区',
            code: '440303'
          },
          {
            label: '福田区',
            code: '440304'
          },
          {
            label: '南山区',
            code: '440305'
          },
          {
            label: '宝安区',
            code: '440306'
          },
          {
            label: '龙岗区',
            code: '440307'
          },
          {
            label: '盐田区',
            code: '440308'
          },
          {
            label: '光明新区',
            code: '440309'
          },
          {
            label: '坪山新区',
            code: '440310'
          },
          {
            label: '大鹏新区',
            code: '440311'
          },
          {
            label: '龙华新区',
            code: '440312'
          }
        ]
      },
      {
        label: '珠海市',
        code: '440400',
        children: [
          {
            label: '香洲区',
            code: '440402'
          },
          {
            label: '斗门区',
            code: '440403'
          },
          {
            label: '金湾区',
            code: '440404'
          }
        ]
      },
      {
        label: '汕头市',
        code: '440500',
        children: [
          {
            label: '龙湖区',
            code: '440507'
          },
          {
            label: '金平区',
            code: '440511'
          },
          {
            label: '濠江区',
            code: '440512'
          },
          {
            label: '潮阳区',
            code: '440513'
          },
          {
            label: '潮南区',
            code: '440514'
          },
          {
            label: '澄海区',
            code: '440515'
          },
          {
            label: '南澳县',
            code: '440523'
          }
        ]
      },
      {
        label: '佛山市',
        code: '440600',
        children: [
          {
            label: '禅城区',
            code: '440604'
          },
          {
            label: '南海区',
            code: '440605'
          },
          {
            label: '顺德区',
            code: '440606'
          },
          {
            label: '三水区',
            code: '440607'
          },
          {
            label: '高明区',
            code: '440608'
          }
        ]
      },
      {
        label: '江门市',
        code: '440700',
        children: [
          {
            label: '蓬江区',
            code: '440703'
          },
          {
            label: '江海区',
            code: '440704'
          },
          {
            label: '新会区',
            code: '440705'
          },
          {
            label: '台山市',
            code: '440781'
          },
          {
            label: '开平市',
            code: '440783'
          },
          {
            label: '鹤山市',
            code: '440784'
          },
          {
            label: '恩平市',
            code: '440785'
          }
        ]
      },
      {
        label: '湛江市',
        code: '440800',
        children: [
          {
            label: '赤坎区',
            code: '440802'
          },
          {
            label: '霞山区',
            code: '440803'
          },
          {
            label: '坡头区',
            code: '440804'
          },
          {
            label: '麻章区',
            code: '440811'
          },
          {
            label: '遂溪县',
            code: '440823'
          },
          {
            label: '徐闻县',
            code: '440825'
          },
          {
            label: '廉江市',
            code: '440881'
          },
          {
            label: '雷州市',
            code: '440882'
          },
          {
            label: '吴川市',
            code: '440883'
          }
        ]
      },
      {
        label: '茂名市',
        code: '440900',
        children: [
          {
            label: '茂南区',
            code: '440902'
          },
          {
            label: '电白区',
            code: '440904'
          },
          {
            label: '高州市',
            code: '440981'
          },
          {
            label: '化州市',
            code: '440982'
          },
          {
            label: '信宜市',
            code: '440983'
          }
        ]
      },
      {
        label: '肇庆市',
        code: '441200',
        children: [
          {
            label: '端州区',
            code: '441202'
          },
          {
            label: '鼎湖区',
            code: '441203'
          },
          {
            label: '广宁县',
            code: '441223'
          },
          {
            label: '怀集县',
            code: '441224'
          },
          {
            label: '封开县',
            code: '441225'
          },
          {
            label: '德庆县',
            code: '441226'
          },
          {
            label: '高要市',
            code: '441283'
          },
          {
            label: '四会市',
            code: '441284'
          }
        ]
      },
      {
        label: '惠州市',
        code: '441300',
        children: [
          {
            label: '惠城区',
            code: '441302'
          },
          {
            label: '惠阳区',
            code: '441303'
          },
          {
            label: '博罗县',
            code: '441322'
          },
          {
            label: '惠东县',
            code: '441323'
          },
          {
            label: '龙门县',
            code: '441324'
          }
        ]
      },
      {
        label: '梅州市',
        code: '441400',
        children: [
          {
            label: '梅江区',
            code: '441402'
          },
          {
            label: '梅县区',
            code: '441403'
          },
          {
            label: '大埔县',
            code: '441422'
          },
          {
            label: '丰顺县',
            code: '441423'
          },
          {
            label: '五华县',
            code: '441424'
          },
          {
            label: '平远县',
            code: '441426'
          },
          {
            label: '蕉岭县',
            code: '441427'
          },
          {
            label: '兴宁市',
            code: '441481'
          }
        ]
      },
      {
        label: '汕尾市',
        code: '441500',
        children: [
          {
            label: '城区',
            code: '441502'
          },
          {
            label: '海丰县',
            code: '441521'
          },
          {
            label: '陆河县',
            code: '441523'
          },
          {
            label: '陆丰市',
            code: '441581'
          }
        ]
      },
      {
        label: '河源市',
        code: '441600',
        children: [
          {
            label: '源城区',
            code: '441602'
          },
          {
            label: '紫金县',
            code: '441621'
          },
          {
            label: '龙川县',
            code: '441622'
          },
          {
            label: '连平县',
            code: '441623'
          },
          {
            label: '和平县',
            code: '441624'
          },
          {
            label: '东源县',
            code: '441625'
          }
        ]
      },
      {
        label: '阳江市',
        code: '441700',
        children: [
          {
            label: '江城区',
            code: '441702'
          },
          {
            label: '阳东区',
            code: '441704'
          },
          {
            label: '阳西县',
            code: '441721'
          },
          {
            label: '阳春市',
            code: '441781'
          }
        ]
      },
      {
        label: '清远市',
        code: '441800',
        children: [
          {
            label: '清城区',
            code: '441802'
          },
          {
            label: '清新区',
            code: '441803'
          },
          {
            label: '佛冈县',
            code: '441821'
          },
          {
            label: '阳山县',
            code: '441823'
          },
          {
            label: '连山壮族瑶族自治县',
            code: '441825'
          },
          {
            label: '连南瑶族自治县',
            code: '441826'
          },
          {
            label: '英德市',
            code: '441881'
          },
          {
            label: '连州市',
            code: '441882'
          }
        ]
      },
      {
        label: '东莞市',
        code: '441900',
        children: [
          {
            label: '莞城区',
            code: '441901'
          },
          {
            label: '南城区',
            code: '441902'
          },
          {
            label: '万江区',
            code: '441904'
          },
          {
            label: '石碣镇',
            code: '441905'
          },
          {
            label: '石龙镇',
            code: '441906'
          },
          {
            label: '茶山镇',
            code: '441907'
          },
          {
            label: '石排镇',
            code: '441908'
          },
          {
            label: '企石镇',
            code: '441909'
          },
          {
            label: '横沥镇',
            code: '441910'
          },
          {
            label: '桥头镇',
            code: '441911'
          },
          {
            label: '谢岗镇',
            code: '441912'
          },
          {
            label: '东坑镇',
            code: '441913'
          },
          {
            label: '常平镇',
            code: '441914'
          },
          {
            label: '寮步镇',
            code: '441915'
          },
          {
            label: '大朗镇',
            code: '441916'
          },
          {
            label: '麻涌镇',
            code: '441917'
          },
          {
            label: '中堂镇',
            code: '441918'
          },
          {
            label: '高埗镇',
            code: '441919'
          },
          {
            label: '樟木头镇',
            code: '441920'
          },
          {
            label: '大岭山镇',
            code: '441921'
          },
          {
            label: '望牛墩镇',
            code: '441922'
          },
          {
            label: '黄江镇',
            code: '441923'
          },
          {
            label: '洪梅镇',
            code: '441924'
          },
          {
            label: '清溪镇',
            code: '441925'
          },
          {
            label: '沙田镇',
            code: '441926'
          },
          {
            label: '道滘镇',
            code: '441927'
          },
          {
            label: '塘厦镇',
            code: '441928'
          },
          {
            label: '虎门镇',
            code: '441929'
          },
          {
            label: '厚街镇',
            code: '441930'
          },
          {
            label: '凤岗镇',
            code: '441931'
          },
          {
            label: '长安镇',
            code: '441932'
          },
          {
            label: '东城区',
            code: '441933'
          }
        ]
      },
      {
        label: '中山市',
        code: '442000',
        children: [
          {
            label: '石岐区',
            code: '442001'
          },
          {
            label: '南区',
            code: '442004'
          },
          {
            label: '五桂山区',
            code: '442005'
          },
          {
            label: '火炬开发区',
            code: '442006'
          },
          {
            label: '黄圃镇',
            code: '442007'
          },
          {
            label: '南头镇',
            code: '442008'
          },
          {
            label: '东凤镇',
            code: '442009'
          },
          {
            label: '阜沙镇',
            code: '442010'
          },
          {
            label: '小榄镇',
            code: '442011'
          },
          {
            label: '东升镇',
            code: '442012'
          },
          {
            label: '古镇镇',
            code: '442013'
          },
          {
            label: '横栏镇',
            code: '442014'
          },
          {
            label: '三角镇',
            code: '442015'
          },
          {
            label: '民众镇',
            code: '442016'
          },
          {
            label: '南朗镇',
            code: '442017'
          },
          {
            label: '港口镇',
            code: '442018'
          },
          {
            label: '大涌镇',
            code: '442019'
          },
          {
            label: '沙溪镇',
            code: '442020'
          },
          {
            label: '三乡镇',
            code: '442021'
          },
          {
            label: '板芙镇',
            code: '442022'
          },
          {
            label: '神湾镇',
            code: '442023'
          },
          {
            label: '坦洲镇',
            code: '442024'
          }
        ]
      },
      {
        label: '潮州市',
        code: '445100',
        children: [
          {
            label: '湘桥区',
            code: '445102'
          },
          {
            label: '潮安区',
            code: '445103'
          },
          {
            label: '饶平县',
            code: '445122'
          }
        ]
      },
      {
        label: '揭阳市',
        code: '445200',
        children: [
          {
            label: '榕城区',
            code: '445202'
          },
          {
            label: '揭东区',
            code: '445203'
          },
          {
            label: '揭西县',
            code: '445222'
          },
          {
            label: '惠来县',
            code: '445224'
          },
          {
            label: '普宁市',
            code: '445281'
          }
        ]
      },
      {
        label: '云浮市',
        code: '445300',
        children: [
          {
            label: '云城区',
            code: '445302'
          },
          {
            label: '云安区',
            code: '445303'
          },
          {
            label: '新兴县',
            code: '445321'
          },
          {
            label: '郁南县',
            code: '445322'
          },
          {
            label: '罗定市',
            code: '445381'
          }
        ]
      }
    ]
  },
  {
    label: '广西壮族自治区',
    code: '450000',
    children: [
      {
        label: '南宁市',
        code: '450100',
        children: [
          {
            label: '兴宁区',
            code: '450102'
          },
          {
            label: '青秀区',
            code: '450103'
          },
          {
            label: '江南区',
            code: '450105'
          },
          {
            label: '西乡塘区',
            code: '450107'
          },
          {
            label: '良庆区',
            code: '450108'
          },
          {
            label: '邕宁区',
            code: '450109'
          },
          {
            label: '武鸣县',
            code: '450122'
          },
          {
            label: '隆安县',
            code: '450123'
          },
          {
            label: '马山县',
            code: '450124'
          },
          {
            label: '上林县',
            code: '450125'
          },
          {
            label: '宾阳县',
            code: '450126'
          },
          {
            label: '横县',
            code: '450127'
          },
          {
            label: '埌东新区',
            code: '450128'
          }
        ]
      },
      {
        label: '柳州市',
        code: '450200',
        children: [
          {
            label: '城中区',
            code: '450202'
          },
          {
            label: '鱼峰区',
            code: '450203'
          },
          {
            label: '柳南区',
            code: '450204'
          },
          {
            label: '柳北区',
            code: '450205'
          },
          {
            label: '柳江县',
            code: '450221'
          },
          {
            label: '柳城县',
            code: '450222'
          },
          {
            label: '鹿寨县',
            code: '450223'
          },
          {
            label: '融安县',
            code: '450224'
          },
          {
            label: '融水苗族自治县',
            code: '450225'
          },
          {
            label: '三江侗族自治县',
            code: '450226'
          },
          {
            label: '柳东新区',
            code: '450227'
          }
        ]
      },
      {
        label: '桂林市',
        code: '450300',
        children: [
          {
            label: '秀峰区',
            code: '450302'
          },
          {
            label: '叠彩区',
            code: '450303'
          },
          {
            label: '象山区',
            code: '450304'
          },
          {
            label: '七星区',
            code: '450305'
          },
          {
            label: '雁山区',
            code: '450311'
          },
          {
            label: '临桂区',
            code: '450312'
          },
          {
            label: '阳朔县',
            code: '450321'
          },
          {
            label: '灵川县',
            code: '450323'
          },
          {
            label: '全州县',
            code: '450324'
          },
          {
            label: '兴安县',
            code: '450325'
          },
          {
            label: '永福县',
            code: '450326'
          },
          {
            label: '灌阳县',
            code: '450327'
          },
          {
            label: '龙胜各族自治县',
            code: '450328'
          },
          {
            label: '资源县',
            code: '450329'
          },
          {
            label: '平乐县',
            code: '450330'
          },
          {
            label: '荔浦县',
            code: '450331'
          },
          {
            label: '恭城瑶族自治县',
            code: '450332'
          }
        ]
      },
      {
        label: '梧州市',
        code: '450400',
        children: [
          {
            label: '万秀区',
            code: '450403'
          },
          {
            label: '长洲区',
            code: '450405'
          },
          {
            label: '龙圩区',
            code: '450406'
          },
          {
            label: '苍梧县',
            code: '450421'
          },
          {
            label: '藤县',
            code: '450422'
          },
          {
            label: '蒙山县',
            code: '450423'
          },
          {
            label: '岑溪市',
            code: '450481'
          }
        ]
      },
      {
        label: '北海市',
        code: '450500',
        children: [
          {
            label: '海城区',
            code: '450502'
          },
          {
            label: '银海区',
            code: '450503'
          },
          {
            label: '铁山港区',
            code: '450512'
          },
          {
            label: '合浦县',
            code: '450521'
          }
        ]
      },
      {
        label: '防城港市',
        code: '450600',
        children: [
          {
            label: '港口区',
            code: '450602'
          },
          {
            label: '防城区',
            code: '450603'
          },
          {
            label: '上思县',
            code: '450621'
          },
          {
            label: '东兴市',
            code: '450681'
          }
        ]
      },
      {
        label: '钦州市',
        code: '450700',
        children: [
          {
            label: '钦南区',
            code: '450702'
          },
          {
            label: '钦北区',
            code: '450703'
          },
          {
            label: '灵山县',
            code: '450721'
          },
          {
            label: '浦北县',
            code: '450722'
          }
        ]
      },
      {
        label: '贵港市',
        code: '450800',
        children: [
          {
            label: '港北区',
            code: '450802'
          },
          {
            label: '港南区',
            code: '450803'
          },
          {
            label: '覃塘区',
            code: '450804'
          },
          {
            label: '平南县',
            code: '450821'
          },
          {
            label: '桂平市',
            code: '450881'
          }
        ]
      },
      {
        label: '玉林市',
        code: '450900',
        children: [
          {
            label: '玉州区',
            code: '450902'
          },
          {
            label: '福绵区',
            code: '450903'
          },
          {
            label: '玉东新区',
            code: '450904'
          },
          {
            label: '容县',
            code: '450921'
          },
          {
            label: '陆川县',
            code: '450922'
          },
          {
            label: '博白县',
            code: '450923'
          },
          {
            label: '兴业县',
            code: '450924'
          },
          {
            label: '北流市',
            code: '450981'
          }
        ]
      },
      {
        label: '百色市',
        code: '451000',
        children: [
          {
            label: '右江区',
            code: '451002'
          },
          {
            label: '田阳县',
            code: '451021'
          },
          {
            label: '田东县',
            code: '451022'
          },
          {
            label: '平果县',
            code: '451023'
          },
          {
            label: '德保县',
            code: '451024'
          },
          {
            label: '靖西县',
            code: '451025'
          },
          {
            label: '那坡县',
            code: '451026'
          },
          {
            label: '凌云县',
            code: '451027'
          },
          {
            label: '乐业县',
            code: '451028'
          },
          {
            label: '田林县',
            code: '451029'
          },
          {
            label: '西林县',
            code: '451030'
          },
          {
            label: '隆林各族自治县',
            code: '451031'
          }
        ]
      },
      {
        label: '贺州市',
        code: '451100',
        children: [
          {
            label: '八步区',
            code: '451102'
          },
          {
            label: '昭平县',
            code: '451121'
          },
          {
            label: '钟山县',
            code: '451122'
          },
          {
            label: '富川瑶族自治县',
            code: '451123'
          },
          {
            label: '平桂管理区',
            code: '451124'
          }
        ]
      },
      {
        label: '河池市',
        code: '451200',
        children: [
          {
            label: '金城江区',
            code: '451202'
          },
          {
            label: '南丹县',
            code: '451221'
          },
          {
            label: '天峨县',
            code: '451222'
          },
          {
            label: '凤山县',
            code: '451223'
          },
          {
            label: '东兰县',
            code: '451224'
          },
          {
            label: '罗城仫佬族自治县',
            code: '451225'
          },
          {
            label: '环江毛南族自治县',
            code: '451226'
          },
          {
            label: '巴马瑶族自治县',
            code: '451227'
          },
          {
            label: '都安瑶族自治县',
            code: '451228'
          },
          {
            label: '大化瑶族自治县',
            code: '451229'
          },
          {
            label: '宜州市',
            code: '451281'
          }
        ]
      },
      {
        label: '来宾市',
        code: '451300',
        children: [
          {
            label: '兴宾区',
            code: '451302'
          },
          {
            label: '忻城县',
            code: '451321'
          },
          {
            label: '象州县',
            code: '451322'
          },
          {
            label: '武宣县',
            code: '451323'
          },
          {
            label: '金秀瑶族自治县',
            code: '451324'
          },
          {
            label: '合山市',
            code: '451381'
          }
        ]
      },
      {
        label: '崇左市',
        code: '451400',
        children: [
          {
            label: '江州区',
            code: '451402'
          },
          {
            label: '扶绥县',
            code: '451421'
          },
          {
            label: '宁明县',
            code: '451422'
          },
          {
            label: '龙州县',
            code: '451423'
          },
          {
            label: '大新县',
            code: '451424'
          },
          {
            label: '天等县',
            code: '451425'
          },
          {
            label: '凭祥市',
            code: '451481'
          }
        ]
      }
    ]
  },
  {
    label: '海南省',
    code: '460000',
    children: [
      {
        label: '海口市',
        code: '460100',
        children: [
          {
            label: '秀英区',
            code: '460105'
          },
          {
            label: '龙华区',
            code: '460106'
          },
          {
            label: '琼山区',
            code: '460107'
          },
          {
            label: '美兰区',
            code: '460108'
          }
        ]
      },
      {
        label: '三亚市',
        code: '460200',
        children: [
          {
            label: '海棠区',
            code: '460202'
          },
          {
            label: '吉阳区',
            code: '460203'
          },
          {
            label: '天涯区',
            code: '460204'
          },
          {
            label: '崖州区',
            code: '460205'
          }
        ]
      },
      {
        label: '三沙市',
        code: '460300',
        children: [
          {
            label: '西沙群岛',
            code: '460321'
          },
          {
            label: '南沙群岛',
            code: '460322'
          },
          {
            label: '中沙群岛',
            code: '460323'
          }
        ]
      },
      {
        label: '直辖县级',
        code: '469000',
        children: [
          {
            label: '五指山市',
            code: '469001'
          },
          {
            label: '琼海市',
            code: '469002'
          },
          {
            label: '儋州市',
            code: '469003'
          },
          {
            label: '文昌市',
            code: '469005'
          },
          {
            label: '万宁市',
            code: '469006'
          },
          {
            label: '东方市',
            code: '469007'
          },
          {
            label: '定安县',
            code: '469021'
          },
          {
            label: '屯昌县',
            code: '469022'
          },
          {
            label: '澄迈县',
            code: '469023'
          },
          {
            label: '临高县',
            code: '469024'
          },
          {
            label: '白沙黎族自治县',
            code: '469025'
          },
          {
            label: '昌江黎族自治县',
            code: '469026'
          },
          {
            label: '乐东黎族自治县',
            code: '469027'
          },
          {
            label: '陵水黎族自治县',
            code: '469028'
          },
          {
            label: '保亭黎族苗族自治县',
            code: '469029'
          },
          {
            label: '琼中黎族苗族自治县',
            code: '469030'
          }
        ]
      }
    ]
  },
  {
    label: '重庆',
    code: '500000',
    children: [
      {
        label: '重庆市',
        code: '500100',
        children: [
          {
            label: '万州区',
            code: '500101'
          },
          {
            label: '涪陵区',
            code: '500102'
          },
          {
            label: '渝中区',
            code: '500103'
          },
          {
            label: '大渡口区',
            code: '500104'
          },
          {
            label: '江北区',
            code: '500105'
          },
          {
            label: '沙坪坝区',
            code: '500106'
          },
          {
            label: '九龙坡区',
            code: '500107'
          },
          {
            label: '南岸区',
            code: '500108'
          },
          {
            label: '北碚区',
            code: '500109'
          },
          {
            label: '綦江区',
            code: '500110'
          },
          {
            label: '大足区',
            code: '500111'
          },
          {
            label: '渝北区',
            code: '500112'
          },
          {
            label: '巴南区',
            code: '500113'
          },
          {
            label: '黔江区',
            code: '500114'
          },
          {
            label: '长寿区',
            code: '500115'
          },
          {
            label: '江津区',
            code: '500116'
          },
          {
            label: '合川区',
            code: '500117'
          },
          {
            label: '永川区',
            code: '500118'
          },
          {
            label: '南川区',
            code: '500119'
          },
          {
            label: '璧山区',
            code: '500120'
          },
          {
            label: '铜梁区',
            code: '500151'
          }
        ]
      },
      {
        label: '县',
        code: '500200',
        children: [
          {
            label: '潼南县',
            code: '500223'
          },
          {
            label: '荣昌县',
            code: '500226'
          },
          {
            label: '梁平县',
            code: '500228'
          },
          {
            label: '城口县',
            code: '500229'
          },
          {
            label: '丰都县',
            code: '500230'
          },
          {
            label: '垫江县',
            code: '500231'
          },
          {
            label: '武隆县',
            code: '500232'
          },
          {
            label: '忠县',
            code: '500233'
          },
          {
            label: '开县',
            code: '500234'
          },
          {
            label: '云阳县',
            code: '500235'
          },
          {
            label: '奉节县',
            code: '500236'
          },
          {
            label: '巫山县',
            code: '500237'
          },
          {
            label: '巫溪县',
            code: '500238'
          },
          {
            label: '石柱土家族自治县',
            code: '500240'
          },
          {
            label: '秀山土家族苗族自治县',
            code: '500241'
          },
          {
            label: '酉阳土家族苗族自治县',
            code: '500242'
          },
          {
            label: '彭水苗族土家族自治县',
            code: '500243'
          }
        ]
      },
      {
        label: '两江新区',
        code: '500300',
        children: [
          {
            label: '北部新区',
            code: '500301'
          },
          {
            label: '保税港区',
            code: '500302'
          },
          {
            label: '工业园区',
            code: '500303'
          }
        ]
      }
    ]
  },
  {
    label: '四川省',
    code: '510000',
    children: [
      {
        label: '成都市',
        code: '510100',
        children: [
          {
            label: '锦江区',
            code: '510104'
          },
          {
            label: '青羊区',
            code: '510105'
          },
          {
            label: '金牛区',
            code: '510106'
          },
          {
            label: '武侯区',
            code: '510107'
          },
          {
            label: '成华区',
            code: '510108'
          },
          {
            label: '龙泉驿区',
            code: '510112'
          },
          {
            label: '青白江区',
            code: '510113'
          },
          {
            label: '新都区',
            code: '510114'
          },
          {
            label: '温江区',
            code: '510115'
          },
          {
            label: '金堂县',
            code: '510121'
          },
          {
            label: '双流县',
            code: '510122'
          },
          {
            label: '郫县',
            code: '510124'
          },
          {
            label: '大邑县',
            code: '510129'
          },
          {
            label: '蒲江县',
            code: '510131'
          },
          {
            label: '新津县',
            code: '510132'
          },
          {
            label: '都江堰市',
            code: '510181'
          },
          {
            label: '彭州市',
            code: '510182'
          },
          {
            label: '邛崃市',
            code: '510183'
          },
          {
            label: '崇州市',
            code: '510184'
          }
        ]
      },
      {
        label: '自贡市',
        code: '510300',
        children: [
          {
            label: '自流井区',
            code: '510302'
          },
          {
            label: '贡井区',
            code: '510303'
          },
          {
            label: '大安区',
            code: '510304'
          },
          {
            label: '沿滩区',
            code: '510311'
          },
          {
            label: '荣县',
            code: '510321'
          },
          {
            label: '富顺县',
            code: '510322'
          }
        ]
      },
      {
        label: '攀枝花市',
        code: '510400',
        children: [
          {
            label: '东区',
            code: '510402'
          },
          {
            label: '西区',
            code: '510403'
          },
          {
            label: '仁和区',
            code: '510411'
          },
          {
            label: '米易县',
            code: '510421'
          },
          {
            label: '盐边县',
            code: '510422'
          }
        ]
      },
      {
        label: '泸州市',
        code: '510500',
        children: [
          {
            label: '江阳区',
            code: '510502'
          },
          {
            label: '纳溪区',
            code: '510503'
          },
          {
            label: '龙马潭区',
            code: '510504'
          },
          {
            label: '泸县',
            code: '510521'
          },
          {
            label: '合江县',
            code: '510522'
          },
          {
            label: '叙永县',
            code: '510524'
          },
          {
            label: '古蔺县',
            code: '510525'
          }
        ]
      },
      {
        label: '德阳市',
        code: '510600',
        children: [
          {
            label: '旌阳区',
            code: '510603'
          },
          {
            label: '中江县',
            code: '510623'
          },
          {
            label: '罗江县',
            code: '510626'
          },
          {
            label: '广汉市',
            code: '510681'
          },
          {
            label: '什邡市',
            code: '510682'
          },
          {
            label: '绵竹市',
            code: '510683'
          }
        ]
      },
      {
        label: '绵阳市',
        code: '510700',
        children: [
          {
            label: '涪城区',
            code: '510703'
          },
          {
            label: '游仙区',
            code: '510704'
          },
          {
            label: '三台县',
            code: '510722'
          },
          {
            label: '盐亭县',
            code: '510723'
          },
          {
            label: '安县',
            code: '510724'
          },
          {
            label: '梓潼县',
            code: '510725'
          },
          {
            label: '北川羌族自治县',
            code: '510726'
          },
          {
            label: '平武县',
            code: '510727'
          },
          {
            label: '江油市',
            code: '510781'
          }
        ]
      },
      {
        label: '广元市',
        code: '510800',
        children: [
          {
            label: '利州区',
            code: '510802'
          },
          {
            label: '昭化区',
            code: '510811'
          },
          {
            label: '朝天区',
            code: '510812'
          },
          {
            label: '旺苍县',
            code: '510821'
          },
          {
            label: '青川县',
            code: '510822'
          },
          {
            label: '剑阁县',
            code: '510823'
          },
          {
            label: '苍溪县',
            code: '510824'
          }
        ]
      },
      {
        label: '遂宁市',
        code: '510900',
        children: [
          {
            label: '船山区',
            code: '510903'
          },
          {
            label: '安居区',
            code: '510904'
          },
          {
            label: '蓬溪县',
            code: '510921'
          },
          {
            label: '射洪县',
            code: '510922'
          },
          {
            label: '大英县',
            code: '510923'
          }
        ]
      },
      {
        label: '内江市',
        code: '511000',
        children: [
          {
            label: '市中区',
            code: '511002'
          },
          {
            label: '东兴区',
            code: '511011'
          },
          {
            label: '威远县',
            code: '511024'
          },
          {
            label: '资中县',
            code: '511025'
          },
          {
            label: '隆昌县',
            code: '511028'
          }
        ]
      },
      {
        label: '乐山市',
        code: '511100',
        children: [
          {
            label: '市中区',
            code: '511102'
          },
          {
            label: '沙湾区',
            code: '511111'
          },
          {
            label: '五通桥区',
            code: '511112'
          },
          {
            label: '金口河区',
            code: '511113'
          },
          {
            label: '犍为县',
            code: '511123'
          },
          {
            label: '井研县',
            code: '511124'
          },
          {
            label: '夹江县',
            code: '511126'
          },
          {
            label: '沐川县',
            code: '511129'
          },
          {
            label: '峨边彝族自治县',
            code: '511132'
          },
          {
            label: '马边彝族自治县',
            code: '511133'
          },
          {
            label: '峨眉山市',
            code: '511181'
          }
        ]
      },
      {
        label: '南充市',
        code: '511300',
        children: [
          {
            label: '顺庆区',
            code: '511302'
          },
          {
            label: '高坪区',
            code: '511303'
          },
          {
            label: '嘉陵区',
            code: '511304'
          },
          {
            label: '南部县',
            code: '511321'
          },
          {
            label: '营山县',
            code: '511322'
          },
          {
            label: '蓬安县',
            code: '511323'
          },
          {
            label: '仪陇县',
            code: '511324'
          },
          {
            label: '西充县',
            code: '511325'
          },
          {
            label: '阆中市',
            code: '511381'
          }
        ]
      },
      {
        label: '眉山市',
        code: '511400',
        children: [
          {
            label: '东坡区',
            code: '511402'
          },
          {
            label: '彭山区',
            code: '511403'
          },
          {
            label: '仁寿县',
            code: '511421'
          },
          {
            label: '洪雅县',
            code: '511423'
          },
          {
            label: '丹棱县',
            code: '511424'
          },
          {
            label: '青神县',
            code: '511425'
          }
        ]
      },
      {
        label: '宜宾市',
        code: '511500',
        children: [
          {
            label: '翠屏区',
            code: '511502'
          },
          {
            label: '南溪区',
            code: '511503'
          },
          {
            label: '宜宾县',
            code: '511521'
          },
          {
            label: '江安县',
            code: '511523'
          },
          {
            label: '长宁县',
            code: '511524'
          },
          {
            label: '高县',
            code: '511525'
          },
          {
            label: '珙县',
            code: '511526'
          },
          {
            label: '筠连县',
            code: '511527'
          },
          {
            label: '兴文县',
            code: '511528'
          },
          {
            label: '屏山县',
            code: '511529'
          }
        ]
      },
      {
        label: '广安市',
        code: '511600',
        children: [
          {
            label: '广安区',
            code: '511602'
          },
          {
            label: '前锋区',
            code: '511603'
          },
          {
            label: '岳池县',
            code: '511621'
          },
          {
            label: '武胜县',
            code: '511622'
          },
          {
            label: '邻水县',
            code: '511623'
          },
          {
            label: '华蓥市',
            code: '511681'
          }
        ]
      },
      {
        label: '达州市',
        code: '511700',
        children: [
          {
            label: '通川区',
            code: '511702'
          },
          {
            label: '达川区',
            code: '511703'
          },
          {
            label: '宣汉县',
            code: '511722'
          },
          {
            label: '开江县',
            code: '511723'
          },
          {
            label: '大竹县',
            code: '511724'
          },
          {
            label: '渠县',
            code: '511725'
          },
          {
            label: '万源市',
            code: '511781'
          }
        ]
      },
      {
        label: '雅安市',
        code: '511800',
        children: [
          {
            label: '雨城区',
            code: '511802'
          },
          {
            label: '名山区',
            code: '511803'
          },
          {
            label: '荥经县',
            code: '511822'
          },
          {
            label: '汉源县',
            code: '511823'
          },
          {
            label: '石棉县',
            code: '511824'
          },
          {
            label: '天全县',
            code: '511825'
          },
          {
            label: '芦山县',
            code: '511826'
          },
          {
            label: '宝兴县',
            code: '511827'
          }
        ]
      },
      {
        label: '巴中市',
        code: '511900',
        children: [
          {
            label: '巴州区',
            code: '511902'
          },
          {
            label: '恩阳区',
            code: '511903'
          },
          {
            label: '通江县',
            code: '511921'
          },
          {
            label: '南江县',
            code: '511922'
          },
          {
            label: '平昌县',
            code: '511923'
          }
        ]
      },
      {
        label: '资阳市',
        code: '512000',
        children: [
          {
            label: '雁江区',
            code: '512002'
          },
          {
            label: '安岳县',
            code: '512021'
          },
          {
            label: '乐至县',
            code: '512022'
          },
          {
            label: '简阳市',
            code: '512081'
          }
        ]
      },
      {
        label: '阿坝藏族羌族自治州',
        code: '513200',
        children: [
          {
            label: '汶川县',
            code: '513221'
          },
          {
            label: '理县',
            code: '513222'
          },
          {
            label: '茂县',
            code: '513223'
          },
          {
            label: '松潘县',
            code: '513224'
          },
          {
            label: '九寨沟县',
            code: '513225'
          },
          {
            label: '金川县',
            code: '513226'
          },
          {
            label: '小金县',
            code: '513227'
          },
          {
            label: '黑水县',
            code: '513228'
          },
          {
            label: '马尔康县',
            code: '513229'
          },
          {
            label: '壤塘县',
            code: '513230'
          },
          {
            label: '阿坝县',
            code: '513231'
          },
          {
            label: '若尔盖县',
            code: '513232'
          },
          {
            label: '红原县',
            code: '513233'
          }
        ]
      },
      {
        label: '甘孜藏族自治州',
        code: '513300',
        children: [
          {
            label: '康定县',
            code: '513321'
          },
          {
            label: '泸定县',
            code: '513322'
          },
          {
            label: '丹巴县',
            code: '513323'
          },
          {
            label: '九龙县',
            code: '513324'
          },
          {
            label: '雅江县',
            code: '513325'
          },
          {
            label: '道孚县',
            code: '513326'
          },
          {
            label: '炉霍县',
            code: '513327'
          },
          {
            label: '甘孜县',
            code: '513328'
          },
          {
            label: '新龙县',
            code: '513329'
          },
          {
            label: '德格县',
            code: '513330'
          },
          {
            label: '白玉县',
            code: '513331'
          },
          {
            label: '石渠县',
            code: '513332'
          },
          {
            label: '色达县',
            code: '513333'
          },
          {
            label: '理塘县',
            code: '513334'
          },
          {
            label: '巴塘县',
            code: '513335'
          },
          {
            label: '乡城县',
            code: '513336'
          },
          {
            label: '稻城县',
            code: '513337'
          },
          {
            label: '得荣县',
            code: '513338'
          }
        ]
      },
      {
        label: '凉山彝族自治州',
        code: '513400',
        children: [
          {
            label: '西昌市',
            code: '513401'
          },
          {
            label: '木里藏族自治县',
            code: '513422'
          },
          {
            label: '盐源县',
            code: '513423'
          },
          {
            label: '德昌县',
            code: '513424'
          },
          {
            label: '会理县',
            code: '513425'
          },
          {
            label: '会东县',
            code: '513426'
          },
          {
            label: '宁南县',
            code: '513427'
          },
          {
            label: '普格县',
            code: '513428'
          },
          {
            label: '布拖县',
            code: '513429'
          },
          {
            label: '金阳县',
            code: '513430'
          },
          {
            label: '昭觉县',
            code: '513431'
          },
          {
            label: '喜德县',
            code: '513432'
          },
          {
            label: '冕宁县',
            code: '513433'
          },
          {
            label: '越西县',
            code: '513434'
          },
          {
            label: '甘洛县',
            code: '513435'
          },
          {
            label: '美姑县',
            code: '513436'
          },
          {
            label: '雷波县',
            code: '513437'
          }
        ]
      }
    ]
  },
  {
    label: '贵州省',
    code: '520000',
    children: [
      {
        label: '贵阳市',
        code: '520100',
        children: [
          {
            label: '南明区',
            code: '520102'
          },
          {
            label: '云岩区',
            code: '520103'
          },
          {
            label: '花溪区',
            code: '520111'
          },
          {
            label: '乌当区',
            code: '520112'
          },
          {
            label: '白云区',
            code: '520113'
          },
          {
            label: '观山湖区',
            code: '520115'
          },
          {
            label: '开阳县',
            code: '520121'
          },
          {
            label: '息烽县',
            code: '520122'
          },
          {
            label: '修文县',
            code: '520123'
          },
          {
            label: '清镇市',
            code: '520181'
          }
        ]
      },
      {
        label: '六盘水市',
        code: '520200',
        children: [
          {
            label: '钟山区',
            code: '520201'
          },
          {
            label: '六枝特区',
            code: '520203'
          },
          {
            label: '水城县',
            code: '520221'
          },
          {
            label: '盘县',
            code: '520222'
          }
        ]
      },
      {
        label: '遵义市',
        code: '520300',
        children: [
          {
            label: '红花岗区',
            code: '520302'
          },
          {
            label: '汇川区',
            code: '520303'
          },
          {
            label: '遵义县',
            code: '520321'
          },
          {
            label: '桐梓县',
            code: '520322'
          },
          {
            label: '绥阳县',
            code: '520323'
          },
          {
            label: '正安县',
            code: '520324'
          },
          {
            label: '道真仡佬族苗族自治县',
            code: '520325'
          },
          {
            label: '务川仡佬族苗族自治县',
            code: '520326'
          },
          {
            label: '凤冈县',
            code: '520327'
          },
          {
            label: '湄潭县',
            code: '520328'
          },
          {
            label: '余庆县',
            code: '520329'
          },
          {
            label: '习水县',
            code: '520330'
          },
          {
            label: '赤水市',
            code: '520381'
          },
          {
            label: '仁怀市',
            code: '520382'
          }
        ]
      },
      {
        label: '安顺市',
        code: '520400',
        children: [
          {
            label: '西秀区',
            code: '520402'
          },
          {
            label: '平坝区',
            code: '520421'
          },
          {
            label: '普定县',
            code: '520422'
          },
          {
            label: '镇宁布依族苗族自治县',
            code: '520423'
          },
          {
            label: '关岭布依族苗族自治县',
            code: '520424'
          },
          {
            label: '紫云苗族布依族自治县',
            code: '520425'
          }
        ]
      },
      {
        label: '毕节市',
        code: '520500',
        children: [
          {
            label: '七星关区',
            code: '520502'
          },
          {
            label: '大方县',
            code: '520521'
          },
          {
            label: '黔西县',
            code: '520522'
          },
          {
            label: '金沙县',
            code: '520523'
          },
          {
            label: '织金县',
            code: '520524'
          },
          {
            label: '纳雍县',
            code: '520525'
          },
          {
            label: '威宁彝族回族苗族自治县',
            code: '520526'
          },
          {
            label: '赫章县',
            code: '520527'
          }
        ]
      },
      {
        label: '铜仁市',
        code: '520600',
        children: [
          {
            label: '碧江区',
            code: '520602'
          },
          {
            label: '万山区',
            code: '520603'
          },
          {
            label: '江口县',
            code: '520621'
          },
          {
            label: '玉屏侗族自治县',
            code: '520622'
          },
          {
            label: '石阡县',
            code: '520623'
          },
          {
            label: '思南县',
            code: '520624'
          },
          {
            label: '印江土家族苗族自治县',
            code: '520625'
          },
          {
            label: '德江县',
            code: '520626'
          },
          {
            label: '沿河土家族自治县',
            code: '520627'
          },
          {
            label: '松桃苗族自治县',
            code: '520628'
          }
        ]
      },
      {
        label: '黔西南布依族苗族自治州',
        code: '522300',
        children: [
          {
            label: '兴义市',
            code: '522301'
          },
          {
            label: '兴仁县',
            code: '522322'
          },
          {
            label: '普安县',
            code: '522323'
          },
          {
            label: '晴隆县',
            code: '522324'
          },
          {
            label: '贞丰县',
            code: '522325'
          },
          {
            label: '望谟县',
            code: '522326'
          },
          {
            label: '册亨县',
            code: '522327'
          },
          {
            label: '安龙县',
            code: '522328'
          }
        ]
      },
      {
        label: '黔东南苗族侗族自治州',
        code: '522600',
        children: [
          {
            label: '凯里市',
            code: '522601'
          },
          {
            label: '黄平县',
            code: '522622'
          },
          {
            label: '施秉县',
            code: '522623'
          },
          {
            label: '三穗县',
            code: '522624'
          },
          {
            label: '镇远县',
            code: '522625'
          },
          {
            label: '岑巩县',
            code: '522626'
          },
          {
            label: '天柱县',
            code: '522627'
          },
          {
            label: '锦屏县',
            code: '522628'
          },
          {
            label: '剑河县',
            code: '522629'
          },
          {
            label: '台江县',
            code: '522630'
          },
          {
            label: '黎平县',
            code: '522631'
          },
          {
            label: '榕江县',
            code: '522632'
          },
          {
            label: '从江县',
            code: '522633'
          },
          {
            label: '雷山县',
            code: '522634'
          },
          {
            label: '麻江县',
            code: '522635'
          },
          {
            label: '丹寨县',
            code: '522636'
          }
        ]
      },
      {
        label: '黔南布依族苗族自治州',
        code: '522700',
        children: [
          {
            label: '都匀市',
            code: '522701'
          },
          {
            label: '福泉市',
            code: '522702'
          },
          {
            label: '荔波县',
            code: '522722'
          },
          {
            label: '贵定县',
            code: '522723'
          },
          {
            label: '瓮安县',
            code: '522725'
          },
          {
            label: '独山县',
            code: '522726'
          },
          {
            label: '平塘县',
            code: '522727'
          },
          {
            label: '罗甸县',
            code: '522728'
          },
          {
            label: '长顺县',
            code: '522729'
          },
          {
            label: '龙里县',
            code: '522730'
          },
          {
            label: '惠水县',
            code: '522731'
          },
          {
            label: '三都水族自治县',
            code: '522732'
          }
        ]
      }
    ]
  },
  {
    label: '云南省',
    code: '530000',
    children: [
      {
        label: '昆明市',
        code: '530100',
        children: [
          {
            label: '五华区',
            code: '530102'
          },
          {
            label: '盘龙区',
            code: '530103'
          },
          {
            label: '官渡区',
            code: '530111'
          },
          {
            label: '西山区',
            code: '530112'
          },
          {
            label: '东川区',
            code: '530113'
          },
          {
            label: '呈贡区',
            code: '530114'
          },
          {
            label: '晋宁县',
            code: '530122'
          },
          {
            label: '富民县',
            code: '530124'
          },
          {
            label: '宜良县',
            code: '530125'
          },
          {
            label: '石林彝族自治县',
            code: '530126'
          },
          {
            label: '嵩明县',
            code: '530127'
          },
          {
            label: '禄劝彝族苗族自治县',
            code: '530128'
          },
          {
            label: '寻甸回族彝族自治县',
            code: '530129'
          },
          {
            label: '安宁市',
            code: '530181'
          }
        ]
      },
      {
        label: '曲靖市',
        code: '530300',
        children: [
          {
            label: '麒麟区',
            code: '530302'
          },
          {
            label: '马龙县',
            code: '530321'
          },
          {
            label: '陆良县',
            code: '530322'
          },
          {
            label: '师宗县',
            code: '530323'
          },
          {
            label: '罗平县',
            code: '530324'
          },
          {
            label: '富源县',
            code: '530325'
          },
          {
            label: '会泽县',
            code: '530326'
          },
          {
            label: '沾益县',
            code: '530328'
          },
          {
            label: '宣威市',
            code: '530381'
          }
        ]
      },
      {
        label: '玉溪市',
        code: '530400',
        children: [
          {
            label: '红塔区',
            code: '530402'
          },
          {
            label: '江川县',
            code: '530421'
          },
          {
            label: '澄江县',
            code: '530422'
          },
          {
            label: '通海县',
            code: '530423'
          },
          {
            label: '华宁县',
            code: '530424'
          },
          {
            label: '易门县',
            code: '530425'
          },
          {
            label: '峨山彝族自治县',
            code: '530426'
          },
          {
            label: '新平彝族傣族自治县',
            code: '530427'
          },
          {
            label: '元江哈尼族彝族傣族自治县',
            code: '530428'
          }
        ]
      },
      {
        label: '保山市',
        code: '530500',
        children: [
          {
            label: '隆阳区',
            code: '530502'
          },
          {
            label: '施甸县',
            code: '530521'
          },
          {
            label: '腾冲县',
            code: '530522'
          },
          {
            label: '龙陵县',
            code: '530523'
          },
          {
            label: '昌宁县',
            code: '530524'
          }
        ]
      },
      {
        label: '昭通市',
        code: '530600',
        children: [
          {
            label: '昭阳区',
            code: '530602'
          },
          {
            label: '鲁甸县',
            code: '530621'
          },
          {
            label: '巧家县',
            code: '530622'
          },
          {
            label: '盐津县',
            code: '530623'
          },
          {
            label: '大关县',
            code: '530624'
          },
          {
            label: '永善县',
            code: '530625'
          },
          {
            label: '绥江县',
            code: '530626'
          },
          {
            label: '镇雄县',
            code: '530627'
          },
          {
            label: '彝良县',
            code: '530628'
          },
          {
            label: '威信县',
            code: '530629'
          },
          {
            label: '水富县',
            code: '530630'
          }
        ]
      },
      {
        label: '丽江市',
        code: '530700',
        children: [
          {
            label: '古城区',
            code: '530702'
          },
          {
            label: '玉龙纳西族自治县',
            code: '530721'
          },
          {
            label: '永胜县',
            code: '530722'
          },
          {
            label: '华坪县',
            code: '530723'
          },
          {
            label: '宁蒗彝族自治县',
            code: '530724'
          }
        ]
      },
      {
        label: '普洱市',
        code: '530800',
        children: [
          {
            label: '思茅区',
            code: '530802'
          },
          {
            label: '宁洱哈尼族彝族自治县',
            code: '530821'
          },
          {
            label: '墨江哈尼族自治县',
            code: '530822'
          },
          {
            label: '景东彝族自治县',
            code: '530823'
          },
          {
            label: '景谷傣族彝族自治县',
            code: '530824'
          },
          {
            label: '镇沅彝族哈尼族拉祜族自治县',
            code: '530825'
          },
          {
            label: '江城哈尼族彝族自治县',
            code: '530826'
          },
          {
            label: '孟连傣族拉祜族佤族自治县',
            code: '530827'
          },
          {
            label: '澜沧拉祜族自治县',
            code: '530828'
          },
          {
            label: '西盟佤族自治县',
            code: '530829'
          }
        ]
      },
      {
        label: '临沧市',
        code: '530900',
        children: [
          {
            label: '临翔区',
            code: '530902'
          },
          {
            label: '凤庆县',
            code: '530921'
          },
          {
            label: '云县',
            code: '530922'
          },
          {
            label: '永德县',
            code: '530923'
          },
          {
            label: '镇康县',
            code: '530924'
          },
          {
            label: '双江拉祜族佤族布朗族傣族自治县',
            code: '530925'
          },
          {
            label: '耿马傣族佤族自治县',
            code: '530926'
          },
          {
            label: '沧源佤族自治县',
            code: '530927'
          }
        ]
      },
      {
        label: '楚雄彝族自治州',
        code: '532300',
        children: [
          {
            label: '楚雄市',
            code: '532301'
          },
          {
            label: '双柏县',
            code: '532322'
          },
          {
            label: '牟定县',
            code: '532323'
          },
          {
            label: '南华县',
            code: '532324'
          },
          {
            label: '姚安县',
            code: '532325'
          },
          {
            label: '大姚县',
            code: '532326'
          },
          {
            label: '永仁县',
            code: '532327'
          },
          {
            label: '元谋县',
            code: '532328'
          },
          {
            label: '武定县',
            code: '532329'
          },
          {
            label: '禄丰县',
            code: '532331'
          }
        ]
      },
      {
        label: '红河哈尼族彝族自治州',
        code: '532500',
        children: [
          {
            label: '个旧市',
            code: '532501'
          },
          {
            label: '开远市',
            code: '532502'
          },
          {
            label: '蒙自市',
            code: '532503'
          },
          {
            label: '弥勒市',
            code: '532504'
          },
          {
            label: '屏边苗族自治县',
            code: '532523'
          },
          {
            label: '建水县',
            code: '532524'
          },
          {
            label: '石屏县',
            code: '532525'
          },
          {
            label: '泸西县',
            code: '532527'
          },
          {
            label: '元阳县',
            code: '532528'
          },
          {
            label: '红河县',
            code: '532529'
          },
          {
            label: '金平苗族瑶族傣族自治县',
            code: '532530'
          },
          {
            label: '绿春县',
            code: '532531'
          },
          {
            label: '河口瑶族自治县',
            code: '532532'
          }
        ]
      },
      {
        label: '文山壮族苗族自治州',
        code: '532600',
        children: [
          {
            label: '文山市',
            code: '532601'
          },
          {
            label: '砚山县',
            code: '532622'
          },
          {
            label: '西畴县',
            code: '532623'
          },
          {
            label: '麻栗坡县',
            code: '532624'
          },
          {
            label: '马关县',
            code: '532625'
          },
          {
            label: '丘北县',
            code: '532626'
          },
          {
            label: '广南县',
            code: '532627'
          },
          {
            label: '富宁县',
            code: '532628'
          }
        ]
      },
      {
        label: '西双版纳傣族自治州',
        code: '532800',
        children: [
          {
            label: '景洪市',
            code: '532801'
          },
          {
            label: '勐海县',
            code: '532822'
          },
          {
            label: '勐腊县',
            code: '532823'
          }
        ]
      },
      {
        label: '大理白族自治州',
        code: '532900',
        children: [
          {
            label: '大理市',
            code: '532901'
          },
          {
            label: '漾濞彝族自治县',
            code: '532922'
          },
          {
            label: '祥云县',
            code: '532923'
          },
          {
            label: '宾川县',
            code: '532924'
          },
          {
            label: '弥渡县',
            code: '532925'
          },
          {
            label: '南涧彝族自治县',
            code: '532926'
          },
          {
            label: '巍山彝族回族自治县',
            code: '532927'
          },
          {
            label: '永平县',
            code: '532928'
          },
          {
            label: '云龙县',
            code: '532929'
          },
          {
            label: '洱源县',
            code: '532930'
          },
          {
            label: '剑川县',
            code: '532931'
          },
          {
            label: '鹤庆县',
            code: '532932'
          }
        ]
      },
      {
        label: '德宏傣族景颇族自治州',
        code: '533100',
        children: [
          {
            label: '瑞丽市',
            code: '533102'
          },
          {
            label: '芒市',
            code: '533103'
          },
          {
            label: '梁河县',
            code: '533122'
          },
          {
            label: '盈江县',
            code: '533123'
          },
          {
            label: '陇川县',
            code: '533124'
          }
        ]
      },
      {
        label: '怒江傈僳族自治州',
        code: '533300',
        children: [
          {
            label: '泸水县',
            code: '533321'
          },
          {
            label: '福贡县',
            code: '533323'
          },
          {
            label: '贡山独龙族怒族自治县',
            code: '533324'
          },
          {
            label: '兰坪白族普米族自治县',
            code: '533325'
          }
        ]
      },
      {
        label: '迪庆藏族自治州',
        code: '533400',
        children: [
          {
            label: '香格里拉市',
            code: '533421'
          },
          {
            label: '德钦县',
            code: '533422'
          },
          {
            label: '维西傈僳族自治县',
            code: '533423'
          }
        ]
      }
    ]
  },
  {
    label: '西藏自治区',
    code: '540000',
    children: [
      {
        label: '拉萨市',
        code: '540100',
        children: [
          {
            label: '城关区',
            code: '540102'
          },
          {
            label: '林周县',
            code: '540121'
          },
          {
            label: '当雄县',
            code: '540122'
          },
          {
            label: '尼木县',
            code: '540123'
          },
          {
            label: '曲水县',
            code: '540124'
          },
          {
            label: '堆龙德庆县',
            code: '540125'
          },
          {
            label: '达孜县',
            code: '540126'
          },
          {
            label: '墨竹工卡县',
            code: '540127'
          }
        ]
      },
      {
        label: '日喀则市',
        code: '540200',
        children: [
          {
            label: '桑珠孜区',
            code: '540202'
          },
          {
            label: '南木林县',
            code: '540221'
          },
          {
            label: '江孜县',
            code: '540222'
          },
          {
            label: '定日县',
            code: '540223'
          },
          {
            label: '萨迦县',
            code: '540224'
          },
          {
            label: '拉孜县',
            code: '540225'
          },
          {
            label: '昂仁县',
            code: '540226'
          },
          {
            label: '谢通门县',
            code: '540227'
          },
          {
            label: '白朗县',
            code: '540228'
          },
          {
            label: '仁布县',
            code: '540229'
          },
          {
            label: '康马县',
            code: '540230'
          },
          {
            label: '定结县',
            code: '540231'
          },
          {
            label: '仲巴县',
            code: '540232'
          },
          {
            label: '亚东县',
            code: '540233'
          },
          {
            label: '吉隆县',
            code: '540234'
          },
          {
            label: '聂拉木县',
            code: '540235'
          },
          {
            label: '萨嘎县',
            code: '540236'
          },
          {
            label: '岗巴县',
            code: '540237'
          }
        ]
      },
      {
        label: '昌都市',
        code: '540300',
        children: [
          {
            label: '卡若区',
            code: '540302'
          },
          {
            label: '江达县',
            code: '540321'
          },
          {
            label: '贡觉县',
            code: '540322'
          },
          {
            label: '类乌齐县',
            code: '540323'
          },
          {
            label: '丁青县',
            code: '540324'
          },
          {
            label: '察雅县',
            code: '540325'
          },
          {
            label: '八宿县',
            code: '540326'
          },
          {
            label: '左贡县',
            code: '540327'
          },
          {
            label: '芒康县',
            code: '540328'
          },
          {
            label: '洛隆县',
            code: '540329'
          },
          {
            label: '边坝县',
            code: '540330'
          }
        ]
      },
      {
        label: '山南地区',
        code: '542200',
        children: [
          {
            label: '乃东县',
            code: '542221'
          },
          {
            label: '扎囊县',
            code: '542222'
          },
          {
            label: '贡嘎县',
            code: '542223'
          },
          {
            label: '桑日县',
            code: '542224'
          },
          {
            label: '琼结县',
            code: '542225'
          },
          {
            label: '曲松县',
            code: '542226'
          },
          {
            label: '措美县',
            code: '542227'
          },
          {
            label: '洛扎县',
            code: '542228'
          },
          {
            label: '加查县',
            code: '542229'
          },
          {
            label: '隆子县',
            code: '542231'
          },
          {
            label: '错那县',
            code: '542232'
          },
          {
            label: '浪卡子县',
            code: '542233'
          }
        ]
      },
      {
        label: '那曲地区',
        code: '542400',
        children: [
          {
            label: '那曲县',
            code: '542421'
          },
          {
            label: '嘉黎县',
            code: '542422'
          },
          {
            label: '比如县',
            code: '542423'
          },
          {
            label: '聂荣县',
            code: '542424'
          },
          {
            label: '安多县',
            code: '542425'
          },
          {
            label: '申扎县',
            code: '542426'
          },
          {
            label: '索县',
            code: '542427'
          },
          {
            label: '班戈县',
            code: '542428'
          },
          {
            label: '巴青县',
            code: '542429'
          },
          {
            label: '尼玛县',
            code: '542430'
          },
          {
            label: '双湖县',
            code: '542431'
          }
        ]
      },
      {
        label: '阿里地区',
        code: '542500',
        children: [
          {
            label: '普兰县',
            code: '542521'
          },
          {
            label: '札达县',
            code: '542522'
          },
          {
            label: '噶尔县',
            code: '542523'
          },
          {
            label: '日土县',
            code: '542524'
          },
          {
            label: '革吉县',
            code: '542525'
          },
          {
            label: '改则县',
            code: '542526'
          },
          {
            label: '措勤县',
            code: '542527'
          }
        ]
      },
      {
        label: '林芝地区',
        code: '542600',
        children: [
          {
            label: '林芝县',
            code: '542621'
          },
          {
            label: '工布江达县',
            code: '542622'
          },
          {
            label: '米林县',
            code: '542623'
          },
          {
            label: '墨脱县',
            code: '542624'
          },
          {
            label: '波密县',
            code: '542625'
          },
          {
            label: '察隅县',
            code: '542626'
          },
          {
            label: '朗县',
            code: '542627'
          }
        ]
      }
    ]
  },
  {
    label: '陕西省',
    code: '610000',
    children: [
      {
        label: '西安市',
        code: '610100',
        children: [
          {
            label: '新城区',
            code: '610102'
          },
          {
            label: '碑林区',
            code: '610103'
          },
          {
            label: '莲湖区',
            code: '610104'
          },
          {
            label: '灞桥区',
            code: '610111'
          },
          {
            label: '未央区',
            code: '610112'
          },
          {
            label: '雁塔区',
            code: '610113'
          },
          {
            label: '阎良区',
            code: '610114'
          },
          {
            label: '临潼区',
            code: '610115'
          },
          {
            label: '长安区',
            code: '610116'
          },
          {
            label: '蓝田县',
            code: '610122'
          },
          {
            label: '周至县',
            code: '610124'
          },
          {
            label: '户县',
            code: '610125'
          },
          {
            label: '高陵区',
            code: '610126'
          }
        ]
      },
      {
        label: '铜川市',
        code: '610200',
        children: [
          {
            label: '王益区',
            code: '610202'
          },
          {
            label: '印台区',
            code: '610203'
          },
          {
            label: '耀州区',
            code: '610204'
          },
          {
            label: '宜君县',
            code: '610222'
          }
        ]
      },
      {
        label: '宝鸡市',
        code: '610300',
        children: [
          {
            label: '渭滨区',
            code: '610302'
          },
          {
            label: '金台区',
            code: '610303'
          },
          {
            label: '陈仓区',
            code: '610304'
          },
          {
            label: '凤翔县',
            code: '610322'
          },
          {
            label: '岐山县',
            code: '610323'
          },
          {
            label: '扶风县',
            code: '610324'
          },
          {
            label: '眉县',
            code: '610326'
          },
          {
            label: '陇县',
            code: '610327'
          },
          {
            label: '千阳县',
            code: '610328'
          },
          {
            label: '麟游县',
            code: '610329'
          },
          {
            label: '凤县',
            code: '610330'
          },
          {
            label: '太白县',
            code: '610331'
          }
        ]
      },
      {
        label: '咸阳市',
        code: '610400',
        children: [
          {
            label: '秦都区',
            code: '610402'
          },
          {
            label: '杨陵区',
            code: '610403'
          },
          {
            label: '渭城区',
            code: '610404'
          },
          {
            label: '三原县',
            code: '610422'
          },
          {
            label: '泾阳县',
            code: '610423'
          },
          {
            label: '乾县',
            code: '610424'
          },
          {
            label: '礼泉县',
            code: '610425'
          },
          {
            label: '永寿县',
            code: '610426'
          },
          {
            label: '彬县',
            code: '610427'
          },
          {
            label: '长武县',
            code: '610428'
          },
          {
            label: '旬邑县',
            code: '610429'
          },
          {
            label: '淳化县',
            code: '610430'
          },
          {
            label: '武功县',
            code: '610431'
          },
          {
            label: '兴平市',
            code: '610481'
          }
        ]
      },
      {
        label: '渭南市',
        code: '610500',
        children: [
          {
            label: '临渭区',
            code: '610502'
          },
          {
            label: '华县',
            code: '610521'
          },
          {
            label: '潼关县',
            code: '610522'
          },
          {
            label: '大荔县',
            code: '610523'
          },
          {
            label: '合阳县',
            code: '610524'
          },
          {
            label: '澄城县',
            code: '610525'
          },
          {
            label: '蒲城县',
            code: '610526'
          },
          {
            label: '白水县',
            code: '610527'
          },
          {
            label: '富平县',
            code: '610528'
          },
          {
            label: '韩城市',
            code: '610581'
          },
          {
            label: '华阴市',
            code: '610582'
          }
        ]
      },
      {
        label: '延安市',
        code: '610600',
        children: [
          {
            label: '宝塔区',
            code: '610602'
          },
          {
            label: '延长县',
            code: '610621'
          },
          {
            label: '延川县',
            code: '610622'
          },
          {
            label: '子长县',
            code: '610623'
          },
          {
            label: '安塞县',
            code: '610624'
          },
          {
            label: '志丹县',
            code: '610625'
          },
          {
            label: '吴起县',
            code: '610626'
          },
          {
            label: '甘泉县',
            code: '610627'
          },
          {
            label: '富县',
            code: '610628'
          },
          {
            label: '洛川县',
            code: '610629'
          },
          {
            label: '宜川县',
            code: '610630'
          },
          {
            label: '黄龙县',
            code: '610631'
          },
          {
            label: '黄陵县',
            code: '610632'
          }
        ]
      },
      {
        label: '汉中市',
        code: '610700',
        children: [
          {
            label: '汉台区',
            code: '610702'
          },
          {
            label: '南郑县',
            code: '610721'
          },
          {
            label: '城固县',
            code: '610722'
          },
          {
            label: '洋县',
            code: '610723'
          },
          {
            label: '西乡县',
            code: '610724'
          },
          {
            label: '勉县',
            code: '610725'
          },
          {
            label: '宁强县',
            code: '610726'
          },
          {
            label: '略阳县',
            code: '610727'
          },
          {
            label: '镇巴县',
            code: '610728'
          },
          {
            label: '留坝县',
            code: '610729'
          },
          {
            label: '佛坪县',
            code: '610730'
          }
        ]
      },
      {
        label: '榆林市',
        code: '610800',
        children: [
          {
            label: '榆阳区',
            code: '610802'
          },
          {
            label: '神木县',
            code: '610821'
          },
          {
            label: '府谷县',
            code: '610822'
          },
          {
            label: '横山县',
            code: '610823'
          },
          {
            label: '靖边县',
            code: '610824'
          },
          {
            label: '定边县',
            code: '610825'
          },
          {
            label: '绥德县',
            code: '610826'
          },
          {
            label: '米脂县',
            code: '610827'
          },
          {
            label: '佳县',
            code: '610828'
          },
          {
            label: '吴堡县',
            code: '610829'
          },
          {
            label: '清涧县',
            code: '610830'
          },
          {
            label: '子洲县',
            code: '610831'
          }
        ]
      },
      {
        label: '安康市',
        code: '610900',
        children: [
          {
            label: '汉滨区',
            code: '610902'
          },
          {
            label: '汉阴县',
            code: '610921'
          },
          {
            label: '石泉县',
            code: '610922'
          },
          {
            label: '宁陕县',
            code: '610923'
          },
          {
            label: '紫阳县',
            code: '610924'
          },
          {
            label: '岚皋县',
            code: '610925'
          },
          {
            label: '平利县',
            code: '610926'
          },
          {
            label: '镇坪县',
            code: '610927'
          },
          {
            label: '旬阳县',
            code: '610928'
          },
          {
            label: '白河县',
            code: '610929'
          }
        ]
      },
      {
        label: '商洛市',
        code: '611000',
        children: [
          {
            label: '商州区',
            code: '611002'
          },
          {
            label: '洛南县',
            code: '611021'
          },
          {
            label: '丹凤县',
            code: '611022'
          },
          {
            label: '商南县',
            code: '611023'
          },
          {
            label: '山阳县',
            code: '611024'
          },
          {
            label: '镇安县',
            code: '611025'
          },
          {
            label: '柞水县',
            code: '611026'
          }
        ]
      },
      {
        label: '西咸新区',
        code: '611100',
        children: [
          {
            label: '空港新城',
            code: '611101'
          },
          {
            label: '沣东新城',
            code: '611102'
          },
          {
            label: '秦汉新城',
            code: '611103'
          },
          {
            label: '沣西新城',
            code: '611104'
          },
          {
            label: '泾河新城',
            code: '611105'
          }
        ]
      }
    ]
  },
  {
    label: '甘肃省',
    code: '620000',
    children: [
      {
        label: '兰州市',
        code: '620100',
        children: [
          {
            label: '城关区',
            code: '620102'
          },
          {
            label: '七里河区',
            code: '620103'
          },
          {
            label: '西固区',
            code: '620104'
          },
          {
            label: '安宁区',
            code: '620105'
          },
          {
            label: '红古区',
            code: '620111'
          },
          {
            label: '永登县',
            code: '620121'
          },
          {
            label: '皋兰县',
            code: '620122'
          },
          {
            label: '榆中县',
            code: '620123'
          }
        ]
      },
      {
        label: '嘉峪关市',
        code: '620200',
        children: [
          {
            label: '雄关区',
            code: '620201'
          },
          {
            label: '长城区',
            code: '620202'
          },
          {
            label: '镜铁区',
            code: '620203'
          }
        ]
      },
      {
        label: '金昌市',
        code: '620300',
        children: [
          {
            label: '金川区',
            code: '620302'
          },
          {
            label: '永昌县',
            code: '620321'
          }
        ]
      },
      {
        label: '白银市',
        code: '620400',
        children: [
          {
            label: '白银区',
            code: '620402'
          },
          {
            label: '平川区',
            code: '620403'
          },
          {
            label: '靖远县',
            code: '620421'
          },
          {
            label: '会宁县',
            code: '620422'
          },
          {
            label: '景泰县',
            code: '620423'
          }
        ]
      },
      {
        label: '天水市',
        code: '620500',
        children: [
          {
            label: '秦州区',
            code: '620502'
          },
          {
            label: '麦积区',
            code: '620503'
          },
          {
            label: '清水县',
            code: '620521'
          },
          {
            label: '秦安县',
            code: '620522'
          },
          {
            label: '甘谷县',
            code: '620523'
          },
          {
            label: '武山县',
            code: '620524'
          },
          {
            label: '张家川回族自治县',
            code: '620525'
          }
        ]
      },
      {
        label: '武威市',
        code: '620600',
        children: [
          {
            label: '凉州区',
            code: '620602'
          },
          {
            label: '民勤县',
            code: '620621'
          },
          {
            label: '古浪县',
            code: '620622'
          },
          {
            label: '天祝藏族自治县',
            code: '620623'
          }
        ]
      },
      {
        label: '张掖市',
        code: '620700',
        children: [
          {
            label: '甘州区',
            code: '620702'
          },
          {
            label: '肃南裕固族自治县',
            code: '620721'
          },
          {
            label: '民乐县',
            code: '620722'
          },
          {
            label: '临泽县',
            code: '620723'
          },
          {
            label: '高台县',
            code: '620724'
          },
          {
            label: '山丹县',
            code: '620725'
          }
        ]
      },
      {
        label: '平凉市',
        code: '620800',
        children: [
          {
            label: '崆峒区',
            code: '620802'
          },
          {
            label: '泾川县',
            code: '620821'
          },
          {
            label: '灵台县',
            code: '620822'
          },
          {
            label: '崇信县',
            code: '620823'
          },
          {
            label: '华亭县',
            code: '620824'
          },
          {
            label: '庄浪县',
            code: '620825'
          },
          {
            label: '静宁县',
            code: '620826'
          }
        ]
      },
      {
        label: '酒泉市',
        code: '620900',
        children: [
          {
            label: '肃州区',
            code: '620902'
          },
          {
            label: '金塔县',
            code: '620921'
          },
          {
            label: '瓜州县',
            code: '620922'
          },
          {
            label: '肃北蒙古族自治县',
            code: '620923'
          },
          {
            label: '阿克塞哈萨克族自治县',
            code: '620924'
          },
          {
            label: '玉门市',
            code: '620981'
          },
          {
            label: '敦煌市',
            code: '620982'
          }
        ]
      },
      {
        label: '庆阳市',
        code: '621000',
        children: [
          {
            label: '西峰区',
            code: '621002'
          },
          {
            label: '庆城县',
            code: '621021'
          },
          {
            label: '环县',
            code: '621022'
          },
          {
            label: '华池县',
            code: '621023'
          },
          {
            label: '合水县',
            code: '621024'
          },
          {
            label: '正宁县',
            code: '621025'
          },
          {
            label: '宁县',
            code: '621026'
          },
          {
            label: '镇原县',
            code: '621027'
          }
        ]
      },
      {
        label: '定西市',
        code: '621100',
        children: [
          {
            label: '安定区',
            code: '621102'
          },
          {
            label: '通渭县',
            code: '621121'
          },
          {
            label: '陇西县',
            code: '621122'
          },
          {
            label: '渭源县',
            code: '621123'
          },
          {
            label: '临洮县',
            code: '621124'
          },
          {
            label: '漳县',
            code: '621125'
          },
          {
            label: '岷县',
            code: '621126'
          }
        ]
      },
      {
        label: '陇南市',
        code: '621200',
        children: [
          {
            label: '武都区',
            code: '621202'
          },
          {
            label: '成县',
            code: '621221'
          },
          {
            label: '文县',
            code: '621222'
          },
          {
            label: '宕昌县',
            code: '621223'
          },
          {
            label: '康县',
            code: '621224'
          },
          {
            label: '西和县',
            code: '621225'
          },
          {
            label: '礼县',
            code: '621226'
          },
          {
            label: '徽县',
            code: '621227'
          },
          {
            label: '两当县',
            code: '621228'
          }
        ]
      },
      {
        label: '临夏回族自治州',
        code: '622900',
        children: [
          {
            label: '临夏市',
            code: '622901'
          },
          {
            label: '临夏县',
            code: '622921'
          },
          {
            label: '康乐县',
            code: '622922'
          },
          {
            label: '永靖县',
            code: '622923'
          },
          {
            label: '广河县',
            code: '622924'
          },
          {
            label: '和政县',
            code: '622925'
          },
          {
            label: '东乡族自治县',
            code: '622926'
          },
          {
            label: '积石山保安族东乡族撒拉族自治县',
            code: '622927'
          }
        ]
      },
      {
        label: '甘南藏族自治州',
        code: '623000',
        children: [
          {
            label: '合作市',
            code: '623001'
          },
          {
            label: '临潭县',
            code: '623021'
          },
          {
            label: '卓尼县',
            code: '623022'
          },
          {
            label: '舟曲县',
            code: '623023'
          },
          {
            label: '迭部县',
            code: '623024'
          },
          {
            label: '玛曲县',
            code: '623025'
          },
          {
            label: '碌曲县',
            code: '623026'
          },
          {
            label: '夏河县',
            code: '623027'
          }
        ]
      }
    ]
  },
  {
    label: '青海省',
    code: '630000',
    children: [
      {
        label: '西宁市',
        code: '630100',
        children: [
          {
            label: '城东区',
            code: '630102'
          },
          {
            label: '城中区',
            code: '630103'
          },
          {
            label: '城西区',
            code: '630104'
          },
          {
            label: '城北区',
            code: '630105'
          },
          {
            label: '大通回族土族自治县',
            code: '630121'
          },
          {
            label: '湟中县',
            code: '630122'
          },
          {
            label: '湟源县',
            code: '630123'
          }
        ]
      },
      {
        label: '海东市',
        code: '630200',
        children: [
          {
            label: '乐都区',
            code: '630202'
          },
          {
            label: '平安县',
            code: '630221'
          },
          {
            label: '民和回族土族自治县',
            code: '630222'
          },
          {
            label: '互助土族自治县',
            code: '630223'
          },
          {
            label: '化隆回族自治县',
            code: '630224'
          },
          {
            label: '循化撒拉族自治县',
            code: '630225'
          }
        ]
      },
      {
        label: '海北藏族自治州',
        code: '632200',
        children: [
          {
            label: '门源回族自治县',
            code: '632221'
          },
          {
            label: '祁连县',
            code: '632222'
          },
          {
            label: '海晏县',
            code: '632223'
          },
          {
            label: '刚察县',
            code: '632224'
          }
        ]
      },
      {
        label: '黄南藏族自治州',
        code: '632300',
        children: [
          {
            label: '同仁县',
            code: '632321'
          },
          {
            label: '尖扎县',
            code: '632322'
          },
          {
            label: '泽库县',
            code: '632323'
          },
          {
            label: '河南蒙古族自治县',
            code: '632324'
          }
        ]
      },
      {
        label: '海南藏族自治州',
        code: '632500',
        children: [
          {
            label: '共和县',
            code: '632521'
          },
          {
            label: '同德县',
            code: '632522'
          },
          {
            label: '贵德县',
            code: '632523'
          },
          {
            label: '兴海县',
            code: '632524'
          },
          {
            label: '贵南县',
            code: '632525'
          }
        ]
      },
      {
        label: '果洛藏族自治州',
        code: '632600',
        children: [
          {
            label: '玛沁县',
            code: '632621'
          },
          {
            label: '班玛县',
            code: '632622'
          },
          {
            label: '甘德县',
            code: '632623'
          },
          {
            label: '达日县',
            code: '632624'
          },
          {
            label: '久治县',
            code: '632625'
          },
          {
            label: '玛多县',
            code: '632626'
          }
        ]
      },
      {
        label: '玉树藏族自治州',
        code: '632700',
        children: [
          {
            label: '玉树市',
            code: '632701'
          },
          {
            label: '杂多县',
            code: '632722'
          },
          {
            label: '称多县',
            code: '632723'
          },
          {
            label: '治多县',
            code: '632724'
          },
          {
            label: '囊谦县',
            code: '632725'
          },
          {
            label: '曲麻莱县',
            code: '632726'
          }
        ]
      },
      {
        label: '海西蒙古族藏族自治州',
        code: '632800',
        children: [
          {
            label: '格尔木市',
            code: '632801'
          },
          {
            label: '德令哈市',
            code: '632802'
          },
          {
            label: '乌兰县',
            code: '632821'
          },
          {
            label: '都兰县',
            code: '632822'
          },
          {
            label: '天峻县',
            code: '632823'
          }
        ]
      }
    ]
  },
  {
    label: '宁夏回族自治区',
    code: '640000',
    children: [
      {
        label: '银川市',
        code: '640100',
        children: [
          {
            label: '兴庆区',
            code: '640104'
          },
          {
            label: '西夏区',
            code: '640105'
          },
          {
            label: '金凤区',
            code: '640106'
          },
          {
            label: '永宁县',
            code: '640121'
          },
          {
            label: '贺兰县',
            code: '640122'
          },
          {
            label: '灵武市',
            code: '640181'
          }
        ]
      },
      {
        label: '石嘴山市',
        code: '640200',
        children: [
          {
            label: '大武口区',
            code: '640202'
          },
          {
            label: '惠农区',
            code: '640205'
          },
          {
            label: '平罗县',
            code: '640221'
          }
        ]
      },
      {
        label: '吴忠市',
        code: '640300',
        children: [
          {
            label: '利通区',
            code: '640302'
          },
          {
            label: '红寺堡区',
            code: '640303'
          },
          {
            label: '盐池县',
            code: '640323'
          },
          {
            label: '同心县',
            code: '640324'
          },
          {
            label: '青铜峡市',
            code: '640381'
          }
        ]
      },
      {
        label: '固原市',
        code: '640400',
        children: [
          {
            label: '原州区',
            code: '640402'
          },
          {
            label: '西吉县',
            code: '640422'
          },
          {
            label: '隆德县',
            code: '640423'
          },
          {
            label: '泾源县',
            code: '640424'
          },
          {
            label: '彭阳县',
            code: '640425'
          }
        ]
      },
      {
        label: '中卫市',
        code: '640500',
        children: [
          {
            label: '沙坡头区',
            code: '640502'
          },
          {
            label: '中宁县',
            code: '640521'
          },
          {
            label: '海原县',
            code: '640522'
          }
        ]
      }
    ]
  },
  {
    label: '新疆维吾尔自治区',
    code: '650000',
    children: [
      {
        label: '乌鲁木齐市',
        code: '650100',
        children: [
          {
            label: '天山区',
            code: '650102'
          },
          {
            label: '沙依巴克区',
            code: '650103'
          },
          {
            label: '新市区',
            code: '650104'
          },
          {
            label: '水磨沟区',
            code: '650105'
          },
          {
            label: '头屯河区',
            code: '650106'
          },
          {
            label: '达坂城区',
            code: '650107'
          },
          {
            label: '米东区',
            code: '650109'
          },
          {
            label: '乌鲁木齐县',
            code: '650121'
          }
        ]
      },
      {
        label: '克拉玛依市',
        code: '650200',
        children: [
          {
            label: '独山子区',
            code: '650202'
          },
          {
            label: '克拉玛依区',
            code: '650203'
          },
          {
            label: '白碱滩区',
            code: '650204'
          },
          {
            label: '乌尔禾区',
            code: '650205'
          }
        ]
      },
      {
        label: '吐鲁番地区',
        code: '652100',
        children: [
          {
            label: '吐鲁番市',
            code: '652101'
          },
          {
            label: '鄯善县',
            code: '652122'
          },
          {
            label: '托克逊县',
            code: '652123'
          }
        ]
      },
      {
        label: '哈密地区',
        code: '652200',
        children: [
          {
            label: '哈密市',
            code: '652201'
          },
          {
            label: '巴里坤哈萨克自治县',
            code: '652222'
          },
          {
            label: '伊吾县',
            code: '652223'
          }
        ]
      },
      {
        label: '昌吉回族自治州',
        code: '652300',
        children: [
          {
            label: '昌吉市',
            code: '652301'
          },
          {
            label: '阜康市',
            code: '652302'
          },
          {
            label: '呼图壁县',
            code: '652323'
          },
          {
            label: '玛纳斯县',
            code: '652324'
          },
          {
            label: '奇台县',
            code: '652325'
          },
          {
            label: '吉木萨尔县',
            code: '652327'
          },
          {
            label: '木垒哈萨克自治县',
            code: '652328'
          }
        ]
      },
      {
        label: '博尔塔拉蒙古自治州',
        code: '652700',
        children: [
          {
            label: '博乐市',
            code: '652701'
          },
          {
            label: '阿拉山口市',
            code: '652702'
          },
          {
            label: '精河县',
            code: '652722'
          },
          {
            label: '温泉县',
            code: '652723'
          }
        ]
      },
      {
        label: '巴音郭楞蒙古自治州',
        code: '652800',
        children: [
          {
            label: '库尔勒市',
            code: '652801'
          },
          {
            label: '轮台县',
            code: '652822'
          },
          {
            label: '尉犁县',
            code: '652823'
          },
          {
            label: '若羌县',
            code: '652824'
          },
          {
            label: '且末县',
            code: '652825'
          },
          {
            label: '焉耆回族自治县',
            code: '652826'
          },
          {
            label: '和静县',
            code: '652827'
          },
          {
            label: '和硕县',
            code: '652828'
          },
          {
            label: '博湖县',
            code: '652829'
          }
        ]
      },
      {
        label: '阿克苏地区',
        code: '652900',
        children: [
          {
            label: '阿克苏市',
            code: '652901'
          },
          {
            label: '温宿县',
            code: '652922'
          },
          {
            label: '库车县',
            code: '652923'
          },
          {
            label: '沙雅县',
            code: '652924'
          },
          {
            label: '新和县',
            code: '652925'
          },
          {
            label: '拜城县',
            code: '652926'
          },
          {
            label: '乌什县',
            code: '652927'
          },
          {
            label: '阿瓦提县',
            code: '652928'
          },
          {
            label: '柯坪县',
            code: '652929'
          }
        ]
      },
      {
        label: '克孜勒苏柯尔克孜自治州',
        code: '653000',
        children: [
          {
            label: '阿图什市',
            code: '653001'
          },
          {
            label: '阿克陶县',
            code: '653022'
          },
          {
            label: '阿合奇县',
            code: '653023'
          },
          {
            label: '乌恰县',
            code: '653024'
          }
        ]
      },
      {
        label: '喀什地区',
        code: '653100',
        children: [
          {
            label: '喀什市',
            code: '653101'
          },
          {
            label: '疏附县',
            code: '653121'
          },
          {
            label: '疏勒县',
            code: '653122'
          },
          {
            label: '英吉沙县',
            code: '653123'
          },
          {
            label: '泽普县',
            code: '653124'
          },
          {
            label: '莎车县',
            code: '653125'
          },
          {
            label: '叶城县',
            code: '653126'
          },
          {
            label: '麦盖提县',
            code: '653127'
          },
          {
            label: '岳普湖县',
            code: '653128'
          },
          {
            label: '伽师县',
            code: '653129'
          },
          {
            label: '巴楚县',
            code: '653130'
          },
          {
            label: '塔什库尔干塔吉克自治县',
            code: '653131'
          }
        ]
      },
      {
        label: '和田地区',
        code: '653200',
        children: [
          {
            label: '和田市',
            code: '653201'
          },
          {
            label: '和田县',
            code: '653221'
          },
          {
            label: '墨玉县',
            code: '653222'
          },
          {
            label: '皮山县',
            code: '653223'
          },
          {
            label: '洛浦县',
            code: '653224'
          },
          {
            label: '策勒县',
            code: '653225'
          },
          {
            label: '于田县',
            code: '653226'
          },
          {
            label: '民丰县',
            code: '653227'
          }
        ]
      },
      {
        label: '伊犁哈萨克自治州',
        code: '654000',
        children: [
          {
            label: '伊宁市',
            code: '654002'
          },
          {
            label: '奎屯市',
            code: '654003'
          },
          {
            label: '霍尔果斯市',
            code: '654004'
          },
          {
            label: '伊宁县',
            code: '654021'
          },
          {
            label: '察布查尔锡伯自治县',
            code: '654022'
          },
          {
            label: '霍城县',
            code: '654023'
          },
          {
            label: '巩留县',
            code: '654024'
          },
          {
            label: '新源县',
            code: '654025'
          },
          {
            label: '昭苏县',
            code: '654026'
          },
          {
            label: '特克斯县',
            code: '654027'
          },
          {
            label: '尼勒克县',
            code: '654028'
          }
        ]
      },
      {
        label: '塔城地区',
        code: '654200',
        children: [
          {
            label: '塔城市',
            code: '654201'
          },
          {
            label: '乌苏市',
            code: '654202'
          },
          {
            label: '额敏县',
            code: '654221'
          },
          {
            label: '沙湾县',
            code: '654223'
          },
          {
            label: '托里县',
            code: '654224'
          },
          {
            label: '裕民县',
            code: '654225'
          },
          {
            label: '和布克赛尔蒙古自治县',
            code: '654226'
          }
        ]
      },
      {
        label: '阿勒泰地区',
        code: '654300',
        children: [
          {
            label: '阿勒泰市',
            code: '654301'
          },
          {
            label: '布尔津县',
            code: '654321'
          },
          {
            label: '富蕴县',
            code: '654322'
          },
          {
            label: '福海县',
            code: '654323'
          },
          {
            label: '哈巴河县',
            code: '654324'
          },
          {
            label: '青河县',
            code: '654325'
          },
          {
            label: '吉木乃县',
            code: '654326'
          }
        ]
      },
      {
        label: '直辖县级',
        code: '659000',
        children: [
          {
            label: '石河子市',
            code: '659001'
          },
          {
            label: '阿拉尔市',
            code: '659002'
          },
          {
            label: '图木舒克市',
            code: '659003'
          },
          {
            label: '五家渠市',
            code: '659004'
          },
          {
            label: '北屯市',
            code: '659005'
          },
          {
            label: '铁门关市',
            code: '659006'
          },
          {
            label: '双河市',
            code: '659007'
          }
        ]
      }
    ]
  },
  {
    label: '台湾',
    code: '710000',
    children: [
      {
        label: '台北市',
        code: '710100',
        children: [
          {
            label: '松山区',
            code: '710101'
          },
          {
            label: '信义区',
            code: '710102'
          },
          {
            label: '大安区',
            code: '710103'
          },
          {
            label: '中山区',
            code: '710104'
          },
          {
            label: '中正区',
            code: '710105'
          },
          {
            label: '大同区',
            code: '710106'
          },
          {
            label: '万华区',
            code: '710107'
          },
          {
            label: '文山区',
            code: '710108'
          },
          {
            label: '南港区',
            code: '710109'
          },
          {
            label: '内湖区',
            code: '710110'
          },
          {
            label: '士林区',
            code: '710111'
          },
          {
            label: '北投区',
            code: '710112'
          }
        ]
      },
      {
        label: '高雄市',
        code: '710200',
        children: [
          {
            label: '盐埕区',
            code: '710201'
          },
          {
            label: '鼓山区',
            code: '710202'
          },
          {
            label: '左营区',
            code: '710203'
          },
          {
            label: '楠梓区',
            code: '710204'
          },
          {
            label: '三民区',
            code: '710205'
          },
          {
            label: '新兴区',
            code: '710206'
          },
          {
            label: '前金区',
            code: '710207'
          },
          {
            label: '苓雅区',
            code: '710208'
          },
          {
            label: '前镇区',
            code: '710209'
          },
          {
            label: '旗津区',
            code: '710210'
          },
          {
            label: '小港区',
            code: '710211'
          },
          {
            label: '凤山区',
            code: '710212'
          },
          {
            label: '林园区',
            code: '710213'
          },
          {
            label: '大寮区',
            code: '710214'
          },
          {
            label: '大树区',
            code: '710215'
          },
          {
            label: '大社区',
            code: '710216'
          },
          {
            label: '仁武区',
            code: '710217'
          },
          {
            label: '鸟松区',
            code: '710218'
          },
          {
            label: '冈山区',
            code: '710219'
          },
          {
            label: '桥头区',
            code: '710220'
          },
          {
            label: '燕巢区',
            code: '710221'
          },
          {
            label: '田寮区',
            code: '710222'
          },
          {
            label: '阿莲区',
            code: '710223'
          },
          {
            label: '路竹区',
            code: '710224'
          },
          {
            label: '湖内区',
            code: '710225'
          },
          {
            label: '茄萣区',
            code: '710226'
          },
          {
            label: '永安区',
            code: '710227'
          },
          {
            label: '弥陀区',
            code: '710228'
          },
          {
            label: '梓官区',
            code: '710229'
          },
          {
            label: '旗山区',
            code: '710230'
          },
          {
            label: '美浓区',
            code: '710231'
          },
          {
            label: '六龟区',
            code: '710232'
          },
          {
            label: '甲仙区',
            code: '710233'
          },
          {
            label: '杉林区',
            code: '710234'
          },
          {
            label: '内门区',
            code: '710235'
          },
          {
            label: '茂林区',
            code: '710236'
          },
          {
            label: '桃源区',
            code: '710237'
          },
          {
            label: '那玛夏区',
            code: '710238'
          }
        ]
      },
      {
        label: '基隆市',
        code: '710300',
        children: [
          {
            label: '中正区',
            code: '710301'
          },
          {
            label: '七堵区',
            code: '710302'
          },
          {
            label: '暖暖区',
            code: '710303'
          },
          {
            label: '仁爱区',
            code: '710304'
          },
          {
            label: '中山区',
            code: '710305'
          },
          {
            label: '安乐区',
            code: '710306'
          },
          {
            label: '信义区',
            code: '710307'
          }
        ]
      },
      {
        label: '台中市',
        code: '710400',
        children: [
          {
            label: '中区',
            code: '710401'
          },
          {
            label: '东区',
            code: '710402'
          },
          {
            label: '南区',
            code: '710403'
          },
          {
            label: '西区',
            code: '710404'
          },
          {
            label: '北区',
            code: '710405'
          },
          {
            label: '西屯区',
            code: '710406'
          },
          {
            label: '南屯区',
            code: '710407'
          },
          {
            label: '北屯区',
            code: '710408'
          },
          {
            label: '丰原区',
            code: '710409'
          },
          {
            label: '东势区',
            code: '710410'
          },
          {
            label: '大甲区',
            code: '710411'
          },
          {
            label: '清水区',
            code: '710412'
          },
          {
            label: '沙鹿区',
            code: '710413'
          },
          {
            label: '梧栖区',
            code: '710414'
          },
          {
            label: '后里区',
            code: '710415'
          },
          {
            label: '神冈区',
            code: '710416'
          },
          {
            label: '潭子区',
            code: '710417'
          },
          {
            label: '大雅区',
            code: '710418'
          },
          {
            label: '新社区',
            code: '710419'
          },
          {
            label: '石冈区',
            code: '710420'
          },
          {
            label: '外埔区',
            code: '710421'
          },
          {
            label: '大安区',
            code: '710422'
          },
          {
            label: '乌日区',
            code: '710423'
          },
          {
            label: '大肚区',
            code: '710424'
          },
          {
            label: '龙井区',
            code: '710425'
          },
          {
            label: '雾峰区',
            code: '710426'
          },
          {
            label: '太平区',
            code: '710427'
          },
          {
            label: '大里区',
            code: '710428'
          },
          {
            label: '和平区',
            code: '710429'
          }
        ]
      },
      {
        label: '台南市',
        code: '710500',
        children: [
          {
            label: '东区',
            code: '710501'
          },
          {
            label: '南区',
            code: '710502'
          },
          {
            label: '北区',
            code: '710504'
          },
          {
            label: '安南区',
            code: '710506'
          },
          {
            label: '安平区',
            code: '710507'
          },
          {
            label: '中西区',
            code: '710508'
          },
          {
            label: '新营区',
            code: '710509'
          },
          {
            label: '盐水区',
            code: '710510'
          },
          {
            label: '白河区',
            code: '710511'
          },
          {
            label: '柳营区',
            code: '710512'
          },
          {
            label: '后壁区',
            code: '710513'
          },
          {
            label: '东山区',
            code: '710514'
          },
          {
            label: '麻豆区',
            code: '710515'
          },
          {
            label: '下营区',
            code: '710516'
          },
          {
            label: '六甲区',
            code: '710517'
          },
          {
            label: '官田区',
            code: '710518'
          },
          {
            label: '大内区',
            code: '710519'
          },
          {
            label: '佳里区',
            code: '710520'
          },
          {
            label: '学甲区',
            code: '710521'
          },
          {
            label: '西港区',
            code: '710522'
          },
          {
            label: '七股区',
            code: '710523'
          },
          {
            label: '将军区',
            code: '710524'
          },
          {
            label: '北门区',
            code: '710525'
          },
          {
            label: '新化区',
            code: '710526'
          },
          {
            label: '善化区',
            code: '710527'
          },
          {
            label: '新市区',
            code: '710528'
          },
          {
            label: '安定区',
            code: '710529'
          },
          {
            label: '山上区',
            code: '710530'
          },
          {
            label: '玉井区',
            code: '710531'
          },
          {
            label: '楠西区',
            code: '710532'
          },
          {
            label: '南化区',
            code: '710533'
          },
          {
            label: '左镇区',
            code: '710534'
          },
          {
            label: '仁德区',
            code: '710535'
          },
          {
            label: '归仁区',
            code: '710536'
          },
          {
            label: '关庙区',
            code: '710537'
          },
          {
            label: '龙崎区',
            code: '710538'
          },
          {
            label: '永康区',
            code: '710539'
          }
        ]
      },
      {
        label: '新竹市',
        code: '710600',
        children: [
          {
            label: '东区',
            code: '710601'
          },
          {
            label: '北区',
            code: '710602'
          },
          {
            label: '香山区',
            code: '710603'
          }
        ]
      },
      {
        label: '嘉义市',
        code: '710700',
        children: [
          {
            label: '东区',
            code: '710701'
          },
          {
            label: '西区',
            code: '710702'
          }
        ]
      },
      {
        label: '新北市',
        code: '710800',
        children: [
          {
            label: '板桥区',
            code: '710801'
          },
          {
            label: '三重区',
            code: '710802'
          },
          {
            label: '中和区',
            code: '710803'
          },
          {
            label: '永和区',
            code: '710804'
          },
          {
            label: '新庄区',
            code: '710805'
          },
          {
            label: '新店区',
            code: '710806'
          },
          {
            label: '树林区',
            code: '710807'
          },
          {
            label: '莺歌区',
            code: '710808'
          },
          {
            label: '三峡区',
            code: '710809'
          },
          {
            label: '淡水区',
            code: '710810'
          },
          {
            label: '汐止区',
            code: '710811'
          },
          {
            label: '瑞芳区',
            code: '710812'
          },
          {
            label: '土城区',
            code: '710813'
          },
          {
            label: '芦洲区',
            code: '710814'
          },
          {
            label: '五股区',
            code: '710815'
          },
          {
            label: '泰山区',
            code: '710816'
          },
          {
            label: '林口区',
            code: '710817'
          },
          {
            label: '深坑区',
            code: '710818'
          },
          {
            label: '石碇区',
            code: '710819'
          },
          {
            label: '坪林区',
            code: '710820'
          },
          {
            label: '三芝区',
            code: '710821'
          },
          {
            label: '石门区',
            code: '710822'
          },
          {
            label: '八里区',
            code: '710823'
          },
          {
            label: '平溪区',
            code: '710824'
          },
          {
            label: '双溪区',
            code: '710825'
          },
          {
            label: '贡寮区',
            code: '710826'
          },
          {
            label: '金山区',
            code: '710827'
          },
          {
            label: '万里区',
            code: '710828'
          },
          {
            label: '乌来区',
            code: '710829'
          }
        ]
      },
      {
        label: '宜兰县',
        code: '712200',
        children: [
          {
            label: '宜兰市',
            code: '712201'
          },
          {
            label: '罗东镇',
            code: '712221'
          },
          {
            label: '苏澳镇',
            code: '712222'
          },
          {
            label: '头城镇',
            code: '712223'
          },
          {
            label: '礁溪乡',
            code: '712224'
          },
          {
            label: '壮围乡',
            code: '712225'
          },
          {
            label: '员山乡',
            code: '712226'
          },
          {
            label: '冬山乡',
            code: '712227'
          },
          {
            label: '五结乡',
            code: '712228'
          },
          {
            label: '三星乡',
            code: '712229'
          },
          {
            label: '大同乡',
            code: '712230'
          },
          {
            label: '南澳乡',
            code: '712231'
          }
        ]
      },
      {
        label: '桃园县',
        code: '712300',
        children: [
          {
            label: '桃园市',
            code: '712301'
          },
          {
            label: '中坜市',
            code: '712302'
          },
          {
            label: '平镇市',
            code: '712303'
          },
          {
            label: '八德市',
            code: '712304'
          },
          {
            label: '杨梅市',
            code: '712305'
          },
          {
            label: '芦竹市',
            code: '712306'
          },
          {
            label: '大溪镇',
            code: '712321'
          },
          {
            label: '大园乡',
            code: '712324'
          },
          {
            label: '龟山乡',
            code: '712325'
          },
          {
            label: '龙潭乡',
            code: '712327'
          },
          {
            label: '新屋乡',
            code: '712329'
          },
          {
            label: '观音乡',
            code: '712330'
          },
          {
            label: '复兴乡',
            code: '712331'
          }
        ]
      },
      {
        label: '新竹县',
        code: '712400',
        children: [
          {
            label: '竹北市',
            code: '712401'
          },
          {
            label: '竹东镇',
            code: '712421'
          },
          {
            label: '新埔镇',
            code: '712422'
          },
          {
            label: '关西镇',
            code: '712423'
          },
          {
            label: '湖口乡',
            code: '712424'
          },
          {
            label: '新丰乡',
            code: '712425'
          },
          {
            label: '芎林乡',
            code: '712426'
          },
          {
            label: '横山乡',
            code: '712427'
          },
          {
            label: '北埔乡',
            code: '712428'
          },
          {
            label: '宝山乡',
            code: '712429'
          },
          {
            label: '峨眉乡',
            code: '712430'
          },
          {
            label: '尖石乡',
            code: '712431'
          },
          {
            label: '五峰乡',
            code: '712432'
          }
        ]
      },
      {
        label: '苗栗县',
        code: '712500',
        children: [
          {
            label: '苗栗市',
            code: '712501'
          },
          {
            label: '苑里镇',
            code: '712521'
          },
          {
            label: '通霄镇',
            code: '712522'
          },
          {
            label: '竹南镇',
            code: '712523'
          },
          {
            label: '头份镇',
            code: '712524'
          },
          {
            label: '后龙镇',
            code: '712525'
          },
          {
            label: '卓兰镇',
            code: '712526'
          },
          {
            label: '大湖乡',
            code: '712527'
          },
          {
            label: '公馆乡',
            code: '712528'
          },
          {
            label: '铜锣乡',
            code: '712529'
          },
          {
            label: '南庄乡',
            code: '712530'
          },
          {
            label: '头屋乡',
            code: '712531'
          },
          {
            label: '三义乡',
            code: '712532'
          },
          {
            label: '西湖乡',
            code: '712533'
          },
          {
            label: '造桥乡',
            code: '712534'
          },
          {
            label: '三湾乡',
            code: '712535'
          },
          {
            label: '狮潭乡',
            code: '712536'
          },
          {
            label: '泰安乡',
            code: '712537'
          }
        ]
      },
      {
        label: '彰化县',
        code: '712700',
        children: [
          {
            label: '彰化市',
            code: '712701'
          },
          {
            label: '鹿港镇',
            code: '712721'
          },
          {
            label: '和美镇',
            code: '712722'
          },
          {
            label: '线西乡',
            code: '712723'
          },
          {
            label: '伸港乡',
            code: '712724'
          },
          {
            label: '福兴乡',
            code: '712725'
          },
          {
            label: '秀水乡',
            code: '712726'
          },
          {
            label: '花坛乡',
            code: '712727'
          },
          {
            label: '芬园乡',
            code: '712728'
          },
          {
            label: '员林镇',
            code: '712729'
          },
          {
            label: '溪湖镇',
            code: '712730'
          },
          {
            label: '田中镇',
            code: '712731'
          },
          {
            label: '大村乡',
            code: '712732'
          },
          {
            label: '埔盐乡',
            code: '712733'
          },
          {
            label: '埔心乡',
            code: '712734'
          },
          {
            label: '永靖乡',
            code: '712735'
          },
          {
            label: '社头乡',
            code: '712736'
          },
          {
            label: '二水乡',
            code: '712737'
          },
          {
            label: '北斗镇',
            code: '712738'
          },
          {
            label: '二林镇',
            code: '712739'
          },
          {
            label: '田尾乡',
            code: '712740'
          },
          {
            label: '埤头乡',
            code: '712741'
          },
          {
            label: '芳苑乡',
            code: '712742'
          },
          {
            label: '大城乡',
            code: '712743'
          },
          {
            label: '竹塘乡',
            code: '712744'
          },
          {
            label: '溪州乡',
            code: '712745'
          }
        ]
      },
      {
        label: '南投县',
        code: '712800',
        children: [
          {
            label: '南投市',
            code: '712801'
          },
          {
            label: '埔里镇',
            code: '712821'
          },
          {
            label: '草屯镇',
            code: '712822'
          },
          {
            label: '竹山镇',
            code: '712823'
          },
          {
            label: '集集镇',
            code: '712824'
          },
          {
            label: '名间乡',
            code: '712825'
          },
          {
            label: '鹿谷乡',
            code: '712826'
          },
          {
            label: '中寮乡',
            code: '712827'
          },
          {
            label: '鱼池乡',
            code: '712828'
          },
          {
            label: '国姓乡',
            code: '712829'
          },
          {
            label: '水里乡',
            code: '712830'
          },
          {
            label: '信义乡',
            code: '712831'
          },
          {
            label: '仁爱乡',
            code: '712832'
          }
        ]
      },
      {
        label: '云林县',
        code: '712900',
        children: [
          {
            label: '斗六市',
            code: '712901'
          },
          {
            label: '斗南镇',
            code: '712921'
          },
          {
            label: '虎尾镇',
            code: '712922'
          },
          {
            label: '西螺镇',
            code: '712923'
          },
          {
            label: '土库镇',
            code: '712924'
          },
          {
            label: '北港镇',
            code: '712925'
          },
          {
            label: '古坑乡',
            code: '712926'
          },
          {
            label: '大埤乡',
            code: '712927'
          },
          {
            label: '莿桐乡',
            code: '712928'
          },
          {
            label: '林内乡',
            code: '712929'
          },
          {
            label: '二仑乡',
            code: '712930'
          },
          {
            label: '仑背乡',
            code: '712931'
          },
          {
            label: '麦寮乡',
            code: '712932'
          },
          {
            label: '东势乡',
            code: '712933'
          },
          {
            label: '褒忠乡',
            code: '712934'
          },
          {
            label: '台西乡',
            code: '712935'
          },
          {
            label: '元长乡',
            code: '712936'
          },
          {
            label: '四湖乡',
            code: '712937'
          },
          {
            label: '口湖乡',
            code: '712938'
          },
          {
            label: '水林乡',
            code: '712939'
          }
        ]
      },
      {
        label: '嘉义县',
        code: '713000',
        children: [
          {
            label: '太保市',
            code: '713001'
          },
          {
            label: '朴子市',
            code: '713002'
          },
          {
            label: '布袋镇',
            code: '713023'
          },
          {
            label: '大林镇',
            code: '713024'
          },
          {
            label: '民雄乡',
            code: '713025'
          },
          {
            label: '溪口乡',
            code: '713026'
          },
          {
            label: '新港乡',
            code: '713027'
          },
          {
            label: '六脚乡',
            code: '713028'
          },
          {
            label: '东石乡',
            code: '713029'
          },
          {
            label: '义竹乡',
            code: '713030'
          },
          {
            label: '鹿草乡',
            code: '713031'
          },
          {
            label: '水上乡',
            code: '713032'
          },
          {
            label: '中埔乡',
            code: '713033'
          },
          {
            label: '竹崎乡',
            code: '713034'
          },
          {
            label: '梅山乡',
            code: '713035'
          },
          {
            label: '番路乡',
            code: '713036'
          },
          {
            label: '大埔乡',
            code: '713037'
          },
          {
            label: '阿里山乡',
            code: '713038'
          }
        ]
      },
      {
        label: '屏东县',
        code: '713300',
        children: [
          {
            label: '屏东市',
            code: '713301'
          },
          {
            label: '潮州镇',
            code: '713321'
          },
          {
            label: '东港镇',
            code: '713322'
          },
          {
            label: '恒春镇',
            code: '713323'
          },
          {
            label: '万丹乡',
            code: '713324'
          },
          {
            label: '长治乡',
            code: '713325'
          },
          {
            label: '麟洛乡',
            code: '713326'
          },
          {
            label: '九如乡',
            code: '713327'
          },
          {
            label: '里港乡',
            code: '713328'
          },
          {
            label: '盐埔乡',
            code: '713329'
          },
          {
            label: '高树乡',
            code: '713330'
          },
          {
            label: '万峦乡',
            code: '713331'
          },
          {
            label: '内埔乡',
            code: '713332'
          },
          {
            label: '竹田乡',
            code: '713333'
          },
          {
            label: '新埤乡',
            code: '713334'
          },
          {
            label: '枋寮乡',
            code: '713335'
          },
          {
            label: '新园乡',
            code: '713336'
          },
          {
            label: '崁顶乡',
            code: '713337'
          },
          {
            label: '林边乡',
            code: '713338'
          },
          {
            label: '南州乡',
            code: '713339'
          },
          {
            label: '佳冬乡',
            code: '713340'
          },
          {
            label: '琉球乡',
            code: '713341'
          },
          {
            label: '车城乡',
            code: '713342'
          },
          {
            label: '满州乡',
            code: '713343'
          },
          {
            label: '枋山乡',
            code: '713344'
          },
          {
            label: '三地门乡',
            code: '713345'
          },
          {
            label: '雾台乡',
            code: '713346'
          },
          {
            label: '玛家乡',
            code: '713347'
          },
          {
            label: '泰武乡',
            code: '713348'
          },
          {
            label: '来义乡',
            code: '713349'
          },
          {
            label: '春日乡',
            code: '713350'
          },
          {
            label: '狮子乡',
            code: '713351'
          },
          {
            label: '牡丹乡',
            code: '713352'
          }
        ]
      },
      {
        label: '台东县',
        code: '713400',
        children: [
          {
            label: '台东市',
            code: '713401'
          },
          {
            label: '成功镇',
            code: '713421'
          },
          {
            label: '关山镇',
            code: '713422'
          },
          {
            label: '卑南乡',
            code: '713423'
          },
          {
            label: '鹿野乡',
            code: '713424'
          },
          {
            label: '池上乡',
            code: '713425'
          },
          {
            label: '东河乡',
            code: '713426'
          },
          {
            label: '长滨乡',
            code: '713427'
          },
          {
            label: '太麻里乡',
            code: '713428'
          },
          {
            label: '大武乡',
            code: '713429'
          },
          {
            label: '绿岛乡',
            code: '713430'
          },
          {
            label: '海端乡',
            code: '713431'
          },
          {
            label: '延平乡',
            code: '713432'
          },
          {
            label: '金峰乡',
            code: '713433'
          },
          {
            label: '达仁乡',
            code: '713434'
          },
          {
            label: '兰屿乡',
            code: '713435'
          }
        ]
      },
      {
        label: '花莲县',
        code: '713500',
        children: [
          {
            label: '花莲市',
            code: '713501'
          },
          {
            label: '凤林镇',
            code: '713521'
          },
          {
            label: '玉里镇',
            code: '713522'
          },
          {
            label: '新城乡',
            code: '713523'
          },
          {
            label: '吉安乡',
            code: '713524'
          },
          {
            label: '寿丰乡',
            code: '713525'
          },
          {
            label: '光复乡',
            code: '713526'
          },
          {
            label: '丰滨乡',
            code: '713527'
          },
          {
            label: '瑞穗乡',
            code: '713528'
          },
          {
            label: '富里乡',
            code: '713529'
          },
          {
            label: '秀林乡',
            code: '713530'
          },
          {
            label: '万荣乡',
            code: '713531'
          },
          {
            label: '卓溪乡',
            code: '713532'
          }
        ]
      },
      {
        label: '澎湖县',
        code: '713600',
        children: [
          {
            label: '马公市',
            code: '713601'
          },
          {
            label: '湖西乡',
            code: '713621'
          },
          {
            label: '白沙乡',
            code: '713622'
          },
          {
            label: '西屿乡',
            code: '713623'
          },
          {
            label: '望安乡',
            code: '713624'
          },
          {
            label: '七美乡',
            code: '713625'
          }
        ]
      },
      {
        label: '金门县',
        code: '713700',
        children: [
          {
            label: '金城镇',
            code: '713701'
          },
          {
            label: '金湖镇',
            code: '713702'
          },
          {
            label: '金沙镇',
            code: '713703'
          },
          {
            label: '金宁乡',
            code: '713704'
          },
          {
            label: '烈屿乡',
            code: '713705'
          },
          {
            label: '乌丘乡',
            code: '713706'
          }
        ]
      },
      {
        label: '连江县',
        code: '713800',
        children: [
          {
            label: '南竿乡',
            code: '713801'
          },
          {
            label: '北竿乡',
            code: '713802'
          },
          {
            label: '莒光乡',
            code: '713803'
          },
          {
            label: '东引乡',
            code: '713804'
          }
        ]
      }
    ]
  },
  {
    label: '香港特别行政区',
    code: '810000',
    children: [
      {
        label: '香港岛',
        code: '810100',
        children: [
          {
            label: '中西区',
            code: '810101'
          },
          {
            label: '湾仔区',
            code: '810102'
          },
          {
            label: '东区',
            code: '810103'
          },
          {
            label: '南区',
            code: '810104'
          }
        ]
      },
      {
        label: '九龙',
        code: '810200',
        children: [
          {
            label: '油尖旺区',
            code: '810201'
          },
          {
            label: '深水埗区',
            code: '810202'
          },
          {
            label: '九龙城区',
            code: '810203'
          },
          {
            label: '黄大仙区',
            code: '810204'
          },
          {
            label: '观塘区',
            code: '810205'
          }
        ]
      },
      {
        label: '新界',
        code: '810300',
        children: [
          {
            label: '荃湾区',
            code: '810301'
          },
          {
            label: '屯门区',
            code: '810302'
          },
          {
            label: '元朗区',
            code: '810303'
          },
          {
            label: '北区',
            code: '810304'
          },
          {
            label: '大埔区',
            code: '810305'
          },
          {
            label: '西贡区',
            code: '810306'
          },
          {
            label: '沙田区',
            code: '810307'
          },
          {
            label: '葵青区',
            code: '810308'
          },
          {
            label: '离岛区',
            code: '810309'
          }
        ]
      }
    ]
  },
  {
    label: '澳门特别行政区',
    code: '820000',
    children: [
      {
        label: '澳门半岛',
        code: '820100',
        children: [
          {
            label: '花地玛堂区',
            code: '820101'
          },
          {
            label: '圣安多尼堂区',
            code: '820102'
          },
          {
            label: '大堂区',
            code: '820103'
          },
          {
            label: '望德堂区',
            code: '820104'
          },
          {
            label: '风顺堂区',
            code: '820105'
          }
        ]
      },
      {
        label: '氹仔岛',
        code: '820200',
        children: [
          {
            label: '嘉模堂区',
            code: '820201'
          }
        ]
      },
      {
        label: '路环岛',
        code: '820300',
        children: [
          {
            label: '圣方济各堂区',
            code: '820301'
          }
        ]
      }
    ]
  }
]

export default data
