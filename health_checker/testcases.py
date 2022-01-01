givenInputs = {
    "morp_anal":
        {"input_0": "Şekerleri yedim ."},
    "bounti-sentiment":
        {"input_0": "Sen çok iyi bir insansın. Arkadaşın da iyi."},
    "sent-emd":
        {"input_0": "Bu filmin kayda değer bir konusu olduğunu düşünmüyorum. Oyunculuklar da yetersiz. ."},
    "relx":
        {"input_0": "<e1> Hoyte </e1> was born in <e2> Guyana </e2> ’s capital Georgetown.\nGünde üç haber programı yurtiçinde <e1> TVE1 </e1>'de ve uluslararası olarak <e2> TVE </e2> Internacional\'da yayınlanmaktadır."},
    "morphological_disambiguator":
        {"input_0": "Şekerleri yedim .\nDaha sonra eve geldim ."},
    "ermie":
        {"input_0": "Sonunda anlaşmaya karar verdik. Önemli bir noktaya dikkat çektik bunun üzerine."},
    "boun-pars":
        {"input_0": "Babam bana bal aldı."},
    "ner":
        {"input_0": "Helmut Kohl'ün aradaki farkı kapatmasında da kararsız seçmenlerin bir bölümünü merkez sağa çekmesinin rol oynadığı ileri sürüldü"},
    "question-answering": {"input_0": "Mitokondri nedir?"}
}
expectedOutputs = {
    "morp_anal": {"text": ["raw", "json"]},
    "bounti-sentiment": {"text": ["raw"]},
    "sent-emd": {"text": ["raw"]},
    "relx": {"text": ["raw"]},
    "morphological_disambiguator": {"text": ["raw", "json"]},
    "ermie": {"text": ["raw"]},
    "boun-pars": {"brat_conll": ["raw", "brat"]},
    "ner": {"tagger_output": ["json"]},
    "question-answering": {"question": ["json"]}
}
